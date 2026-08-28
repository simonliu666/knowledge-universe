import { useCallback, useEffect, useRef, useState } from "react"
import {
  type CloudSyncConfig,
  type SyncResult,
  loadConfig,
  updateConfig,
  fullSync,
  pushIfChanged,
} from "@/lib/cloudSync"

export type CloudSyncStatus = "disabled" | "idle" | "syncing" | "error"

export interface CloudSyncState {
  status: CloudSyncStatus
  enabled: boolean
  autoPush: boolean
  lastSyncAt?: number
  error: string | null
  message: string | null
  /** 手动触发完整同步（拉取 + 合并 + 推送） */
  syncNow: () => Promise<void>
  /** 保存配置并启用云同步，随即执行首次同步 */
  enable: (patch: Partial<CloudSyncConfig>) => Promise<void>
  /** 停用云同步（保留 token，下次启用免重填） */
  disable: () => void
  /** 开关自动推送 */
  setAutoPush: (on: boolean) => void
  /** 清除错误信息 */
  clearError: () => void
}

/** 数据变化后自动推送的防抖时长 */
const AUTO_PUSH_DEBOUNCE_MS = 5000

/**
 * 云同步 hook。
 * @param localSnapshot 本地全部数据的 JSON 快照（由调用方 useMemo 聚合），
 *                      变化即触发防抖自动推送
 */
export function useCloudSync(localSnapshot: string): CloudSyncState {
  const [status, setStatus] = useState<CloudSyncStatus>(() =>
    loadConfig().enabled ? "idle" : "disabled"
  )
  const [enabled, setEnabled] = useState(() => loadConfig().enabled)
  const [autoPush, setAutoPushState] = useState(() => loadConfig().autoPush)
  const [lastSyncAt, setLastSyncAt] = useState<number | undefined>(() => loadConfig().lastSyncAt)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const syncingRef = useRef(false)
  const initializedRef = useRef(false)
  const pendingTimerRef = useRef<number | null>(null)
  const snapshotRef = useRef<string>(localSnapshot)

  const runSync = useCallback(async (mode: "full" | "push") => {
    if (syncingRef.current) return
    const config = loadConfig()
    if (!config.enabled || !config.token) return
    syncingRef.current = true
    setStatus("syncing")
    setError(null)
    try {
      let result: SyncResult
      if (mode === "full") {
        result = await fullSync(config)
      } else {
        result = await pushIfChanged(config)
      }
      setLastSyncAt(loadConfig().lastSyncAt)
      setStatus("idle")
      setMessage(result.message)
      // 手动同步 4 秒后清除提示
      if (mode === "full") {
        window.setTimeout(() => setMessage((m) => (m === result.message ? null : m)), 4000)
      }
    } catch (err) {
      setStatus("error")
      setError(
        err instanceof TypeError
          ? "网络请求失败：无法连接 GitHub API，请检查网络后重试"
          : err instanceof Error
            ? err.message
            : String(err)
      )
    } finally {
      syncingRef.current = false
    }
  }, [])

  // 挂载时：已启用则自动执行首次完整同步（拉取云端数据）
  useEffect(() => {
    const config = loadConfig()
    if (config.enabled && config.token) {
      void runSync("full")
    }
    initializedRef.current = true
    return () => {
      // 开发环境 StrictMode 会模拟卸载重挂：释放同步锁，让重挂后能再次同步
      syncingRef.current = false
    }
  }, [runSync])

  // 本地数据变化 → 防抖自动推送
  useEffect(() => {
    const prev = snapshotRef.current
    snapshotRef.current = localSnapshot
    const config = loadConfig()
    if (
      !initializedRef.current ||
      !config.enabled ||
      !config.token ||
      !config.autoPush ||
      prev === localSnapshot
    ) {
      return
    }
    if (pendingTimerRef.current) {
      window.clearTimeout(pendingTimerRef.current)
    }
    pendingTimerRef.current = window.setTimeout(() => {
      pendingTimerRef.current = null
      void runSync("push")
    }, AUTO_PUSH_DEBOUNCE_MS)
  }, [localSnapshot, runSync])

  // 组件卸载时若有未完成的自动推送，立即执行（SPA 内导航 fetch 不中断）
  useEffect(() => {
    return () => {
      if (pendingTimerRef.current) {
        window.clearTimeout(pendingTimerRef.current)
        pendingTimerRef.current = null
        const config = loadConfig()
        if (config.enabled && config.token && config.autoPush) {
          void pushIfChanged(config).catch(() => {
            // 静默失败，下次打开页面同步时会自动合并
          })
        }
      }
    }
  }, [])

  const enable = useCallback(async (patch: Partial<CloudSyncConfig>) => {
    const config = updateConfig({ ...patch, enabled: true })
    setEnabled(true)
    setAutoPushState(config.autoPush)
    await runSync("full")
  }, [runSync])

  const disable = useCallback(() => {
    updateConfig({ enabled: false })
    setEnabled(false)
    setStatus("disabled")
    setError(null)
    setMessage(null)
  }, [])

  const setAutoPush = useCallback((on: boolean) => {
    updateConfig({ autoPush: on })
    setAutoPushState(on)
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return {
    status,
    enabled,
    autoPush,
    lastSyncAt,
    error,
    message,
    syncNow: () => runSync("full"),
    enable,
    disable,
    setAutoPush,
    clearError,
  }
}
