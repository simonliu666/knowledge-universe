/**
 * 云同步核心模块 —— 把 localStorage 中的学习数据（进度/笔记/问答/工具记录）
 * 自动同步到 GitHub 仓库的专用分支（默认 user-data），实现永久存储与多设备漫游。
 *
 * 设计要点：
 * 1. Token 由用户运行时输入，只存浏览器 localStorage，绝不打包进网站代码
 * 2. 数据存放在专用分支，不触发 main 分支的 CI 部署
 * 3. 合并策略为 ID 级 union（笔记/问答/工具记录按 id 合并，进度取并集），多设备不丢数据
 * 4. 拉取后通过自定义事件通知各 hooks 从 localStorage 重载
 */
import type { IPlayerProgress, IKnowledgeNote, IQARecord, IToolRecords } from "@/types"

/* ------------------------------------------------------------------ */
/* 常量与类型                                                          */
/* ------------------------------------------------------------------ */

export const LS_KEYS = {
  progress: "__app_psychology_rpg_progress",
  notes: "__app_psychology_rpg_notes",
  qaRecords: "__app_psychology_rpg_qa_records",
  toolRecords: "__app_psychology_rpg_tool_records",
} as const

const CONFIG_KEY = "__app_ku_cloud_sync_config"
const DATA_FILE = "ku-user-data.json"
const API_BASE = "https://api.github.com"

/** 拉取合并应用后广播，各数据 hooks 监听并从 localStorage 重载 */
export const CLOUD_APPLIED_EVENT = "ku:cloud-applied"

export interface CloudSyncConfig {
  enabled: boolean
  /** GitHub Personal Access Token（运行时输入，仅存本地浏览器） */
  token: string
  owner: string
  repo: string
  branch: string
  /** 数据变化后是否自动推送 */
  autoPush: boolean
  /** 上次成功同步时间戳 */
  lastSyncAt?: number
}

export const DEFAULT_CONFIG: CloudSyncConfig = {
  enabled: false,
  token: "",
  owner: "simonliu666",
  repo: "knowledge-universe",
  branch: "user-data",
  autoPush: true,
}

/** 云端数据信封 */
export interface CloudData {
  version: 1
  updatedAt: number
  progress: IPlayerProgress
  notes: IKnowledgeNote[]
  qaRecords: IQARecord[]
  toolRecords: IToolRecords
}

export interface SyncResult {
  ok: boolean
  /** 是否产生了远端提交 */
  pushed: boolean
  message: string
  data: CloudData | null
}

const EMPTY_TOOL_RECORDS: IToolRecords = {
  abcRecords: [],
  dissonanceChecks: [],
  obedienceDefenses: [],
  biasPractices: [],
}

const DEFAULT_PROGRESS: IPlayerProgress = {
  level: 1,
  exp: 0,
  learnedPoints: [],
  unlockedAchievements: [],
  clearedDungeons: [],
  lastToolBonusDate: undefined,
}

/* ------------------------------------------------------------------ */
/* 配置读写                                                            */
/* ------------------------------------------------------------------ */

export function loadConfig(): CloudSyncConfig {
  try {
    const raw = localStorage.getItem(CONFIG_KEY)
    if (!raw) return { ...DEFAULT_CONFIG }
    const parsed = JSON.parse(raw) as Partial<CloudSyncConfig>
    return { ...DEFAULT_CONFIG, ...parsed }
  } catch {
    return { ...DEFAULT_CONFIG }
  }
}

export function saveConfig(config: CloudSyncConfig) {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config))
  } catch {
    // ignore
  }
}

export function updateConfig(patch: Partial<CloudSyncConfig>): CloudSyncConfig {
  const next = { ...loadConfig(), ...patch }
  saveConfig(next)
  return next
}

/* ------------------------------------------------------------------ */
/* 本地数据收集 / 应用                                                  */
/* ------------------------------------------------------------------ */

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function collectLocalData(): CloudData {
  return {
    version: 1,
    updatedAt: Date.now(),
    progress: { ...DEFAULT_PROGRESS, ...readJSON<Partial<IPlayerProgress>>(LS_KEYS.progress, {}) },
    notes: readJSON<IKnowledgeNote[]>(LS_KEYS.notes, []),
    qaRecords: readJSON<IQARecord[]>(LS_KEYS.qaRecords, []),
    toolRecords: { ...EMPTY_TOOL_RECORDS, ...readJSON<Partial<IToolRecords>>(LS_KEYS.toolRecords, {}) },
  }
}

/** 把合并结果写回 localStorage 并广播事件（各 hooks 监听后重载） */
function applyCloudData(data: CloudData) {
  try {
    localStorage.setItem(LS_KEYS.progress, JSON.stringify(data.progress))
    localStorage.setItem(LS_KEYS.notes, JSON.stringify(data.notes))
    localStorage.setItem(LS_KEYS.qaRecords, JSON.stringify(data.qaRecords))
    localStorage.setItem(LS_KEYS.toolRecords, JSON.stringify(data.toolRecords))
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent(CLOUD_APPLIED_EVENT))
}

/* ------------------------------------------------------------------ */
/* 合并策略（ID 级 union，多设备不丢数据）                                */
/* ------------------------------------------------------------------ */

interface WithId {
  id: string
  createdAt?: number
}

function mergeById<T extends WithId>(a: T[], b: T[]): T[] {
  const map = new Map<string, T>()
  for (const item of [...a, ...b]) {
    if (!item || typeof item.id !== "string") continue
    const existing = map.get(item.id)
    if (!existing || (item.createdAt ?? 0) >= (existing.createdAt ?? 0)) {
      map.set(item.id, item)
    }
  }
  return Array.from(map.values())
}

function mergeProgress(a: IPlayerProgress, b: IPlayerProgress): IPlayerProgress {
  return {
    level: Math.max(a.level ?? 1, b.level ?? 1),
    exp: Math.max(a.exp ?? 0, b.exp ?? 0),
    learnedPoints: Array.from(new Set([...(a.learnedPoints ?? []), ...(b.learnedPoints ?? [])])),
    unlockedAchievements: Array.from(new Set([...(a.unlockedAchievements ?? []), ...(b.unlockedAchievements ?? [])])),
    clearedDungeons: Array.from(new Set([...(a.clearedDungeons ?? []), ...(b.clearedDungeons ?? [])])),
    // YYYY-MM-DD 字符串，字典序比较取更晚日期
    lastToolBonusDate:
      (a.lastToolBonusDate ?? "") > (b.lastToolBonusDate ?? "")
        ? a.lastToolBonusDate
        : b.lastToolBonusDate,
  }
}

function mergeToolRecords(a: IToolRecords, b: IToolRecords): IToolRecords {
  return {
    abcRecords: mergeById(a.abcRecords ?? [], b.abcRecords ?? []),
    dissonanceChecks: mergeById(a.dissonanceChecks ?? [], b.dissonanceChecks ?? []),
    obedienceDefenses: mergeById(a.obedienceDefenses ?? [], b.obedienceDefenses ?? []),
    biasPractices: mergeById(a.biasPractices ?? [], b.biasPractices ?? []),
  }
}

export function mergeData(local: CloudData, remote: CloudData): CloudData {
  return {
    version: 1,
    updatedAt: Date.now(),
    progress: mergeProgress(local.progress, remote.progress),
    notes: mergeById(local.notes, remote.notes),
    qaRecords: mergeById(local.qaRecords, remote.qaRecords),
    toolRecords: mergeToolRecords(local.toolRecords, remote.toolRecords),
  }
}

/* ------------------------------------------------------------------ */
/* UTF-8 base64 编解码                                                 */
/* ------------------------------------------------------------------ */

function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str)
  let binary = ""
  const CHUNK = 0x8000
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK))
  }
  return btoa(binary)
}

function base64ToUtf8(b64: string): string {
  const binary = atob(b64.replace(/\s/g, ""))
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return new TextDecoder().decode(bytes)
}

/* ------------------------------------------------------------------ */
/* GitHub API 封装                                                     */
/* ------------------------------------------------------------------ */

async function githubApi(
  config: CloudSyncConfig,
  path: string,
  init: RequestInit = {}
): Promise<Response> {
  return fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${config.token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      ...init.headers,
    },
  })
}

function apiErrorMessage(status: number, body: string): string {
  try {
    const parsed = JSON.parse(body) as { message?: string }
    if (parsed.message) {
      if (status === 401) return `Token 无效或已过期（${parsed.message}）`
      if (status === 403 && /rate limit/i.test(parsed.message)) return `GitHub API 限流，请稍后再试`
      if (status === 404) return `仓库/分支/文件不存在或 Token 无权限（${parsed.message}）`
      return parsed.message
    }
  } catch {
    // ignore
  }
  return `请求失败（HTTP ${status}）`
}

/** 确保同步分支存在（不存在则从默认分支创建） */
async function ensureBranch(config: CloudSyncConfig): Promise<void> {
  const { owner, repo, branch } = config
  // 分支已存在？
  const head = await githubApi(config, `/repos/${owner}/${repo}/git/ref/heads/${branch}`)
  if (head.ok) return
  if (head.status !== 404) {
    throw new Error(apiErrorMessage(head.status, await head.text()))
  }
  // 获取默认分支及其 HEAD
  const repoInfo = await githubApi(config, `/repos/${owner}/${repo}`)
  if (!repoInfo.ok) {
    throw new Error(apiErrorMessage(repoInfo.status, await repoInfo.text()))
  }
  const defaultBranch = ((await repoInfo.json()) as { default_branch: string }).default_branch
  const ref = await githubApi(config, `/repos/${owner}/${repo}/git/ref/heads/${defaultBranch}`)
  if (!ref.ok) {
    throw new Error(apiErrorMessage(ref.status, await ref.text()))
  }
  const sha = ((await ref.json()) as { object: { sha: string } }).object.sha
  // 创建分支（422 = 已存在，视为成功）
  const created = await githubApi(config, `/repos/${owner}/${repo}/git/refs`, {
    method: "POST",
    body: JSON.stringify({ ref: `refs/heads/${branch}`, sha }),
  })
  if (!created.ok && created.status !== 422) {
    throw new Error(apiErrorMessage(created.status, await created.text()))
  }
}

/** 拉取云端数据；文件不存在时返回 null */
async function fetchRemote(
  config: CloudSyncConfig
): Promise<{ data: CloudData | null; sha: string | null }> {
  const { owner, repo, branch } = config
  const res = await githubApi(
    config,
    `/repos/${owner}/${repo}/contents/${DATA_FILE}?ref=${encodeURIComponent(branch)}`
  )
  if (res.status === 404) return { data: null, sha: null }
  if (!res.ok) {
    throw new Error(apiErrorMessage(res.status, await res.text()))
  }
  const body = (await res.json()) as { sha: string; content: string; encoding: string }
  const text = body.encoding === "base64" ? base64ToUtf8(body.content) : body.content
  try {
    const data = JSON.parse(text) as CloudData
    return { data, sha: body.sha }
  } catch {
    throw new Error("云端数据文件格式异常（非 JSON），请检查仓库中的 " + DATA_FILE)
  }
}

/** 推送数据到云端 */
async function pushRemote(
  config: CloudSyncConfig,
  data: CloudData,
  sha: string | null
): Promise<string> {
  const { owner, repo, branch } = config
  const res = await githubApi(config, `/repos/${owner}/${repo}/contents/${DATA_FILE}`, {
    method: "PUT",
    body: JSON.stringify({
      message: `sync: 学习数据备份 ${new Date().toLocaleString("zh-CN")}`,
      content: utf8ToBase64(JSON.stringify(data)),
      sha: sha ?? undefined,
      branch,
    }),
  })
  if (!res.ok) {
    // 409 冲突：sha 过期，调用方应重试
    if (res.status === 409 || res.status === 422) {
      throw new ConflictError(apiErrorMessage(res.status, await res.text()))
    }
    throw new Error(apiErrorMessage(res.status, await res.text()))
  }
  const body = (await res.json()) as { content: { sha: string } }
  return body.content.sha
}

class ConflictError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ConflictError"
  }
}

/* ------------------------------------------------------------------ */
/* 对外主流程                                                          */
/* ------------------------------------------------------------------ */

/**
 * 完整同步：拉取云端 → 与本地合并 → 应用到本地 → 若有差异则推送。
 * 每个页面会话首次同步 / 用户手动「立即同步」时调用。
 */
export async function fullSync(config: CloudSyncConfig): Promise<SyncResult> {
  await ensureBranch(config)
  const local = collectLocalData()
  const { data: remote, sha } = await fetchRemote(config)

  let merged: CloudData
  if (remote) {
    merged = mergeData(local, remote)
  } else {
    merged = { ...local, updatedAt: Date.now() }
  }

  // 应用合并结果（远端可能带回本地缺失的历史数据）
  applyCloudData(merged)

  // 远端无变化则不必推送
  const remoteStr = remote ? JSON.stringify(stripTimestamp(remote)) : ""
  const mergedStr = JSON.stringify(stripTimestamp(merged))
  if (remote && remoteStr === mergedStr) {
    updateConfig({ lastSyncAt: Date.now() })
    return { ok: true, pushed: false, message: "已是最新（云端与本地一致）", data: merged }
  }

  // 推送（冲突时重试一次：重新拉取合并）
  let currentSha = sha
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const newSha = await pushRemote(config, merged, currentSha)
      updateConfig({ lastSyncAt: Date.now() })
      return {
        ok: true,
        pushed: true,
        message: remote ? "已同步（合并本地与云端数据并推送）" : "已同步（首次备份到云端）",
        data: merged,
      }
    } catch (err) {
      if (err instanceof ConflictError && attempt === 0) {
        // 远端在同步期间被其他设备更新：重新拉取合并后重试
        const again = await fetchRemote(config)
        if (again.data) {
          merged = mergeData(merged, again.data)
          applyCloudData(merged)
        }
        currentSha = again.sha
        continue
      }
      throw err
    }
  }
  throw new Error("推送失败：远端冲突重试后仍未成功")
}

/**
 * 轻量推送：数据变化后的自动备份。
 * 拉取远端 → 合并 → 仅当与远端有差异时推送。
 */
export async function pushIfChanged(config: CloudSyncConfig): Promise<SyncResult> {
  const { data: remote, sha } = await fetchRemote(config)
  const local = collectLocalData()
  const merged = remote ? mergeData(local, remote) : { ...local, updatedAt: Date.now() }

  const remoteStr = remote ? JSON.stringify(stripTimestamp(remote)) : ""
  const mergedStr = JSON.stringify(stripTimestamp(merged))
  if (remote && remoteStr === mergedStr) {
    updateConfig({ lastSyncAt: Date.now() })
    return { ok: true, pushed: false, message: "无需同步", data: merged }
  }

  const newSha = await pushRemote(config, merged, sha)
  void newSha
  updateConfig({ lastSyncAt: Date.now() })
  return { ok: true, pushed: true, message: "已自动备份", data: merged }
}

/** 去掉 updatedAt 时间戳后比较内容是否一致 */
function stripTimestamp(data: CloudData): Omit<CloudData, "updatedAt"> {
  const { updatedAt: _updatedAt, ...rest } = data
  return rest
}

/** 验证 Token 有效性（返回登录名，失败抛错） */
export async function validateToken(config: CloudSyncConfig): Promise<string> {
  const res = await githubApi(config, "/user")
  if (!res.ok) {
    throw new Error(apiErrorMessage(res.status, await res.text()))
  }
  const body = (await res.json()) as { login: string }
  return body.login
}
