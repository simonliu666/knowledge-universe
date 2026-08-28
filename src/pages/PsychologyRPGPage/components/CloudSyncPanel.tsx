import { useState, useCallback } from "react"
import { Cloud, CloudOff, RefreshCw, ChevronDown, ChevronUp, Settings2, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react"
import type { CloudSyncState } from "@/hooks/useCloudSync"
import { DEFAULT_CONFIG } from "@/lib/cloudSync"

interface CloudSyncPanelProps {
  cloudSync: CloudSyncState
}

function formatTime(ts?: number): string {
  if (!ts) return "从未"
  return new Date(ts).toLocaleString("zh-CN", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })
}

export function CloudSyncPanel({ cloudSync }: CloudSyncPanelProps) {
  const [expanded, setExpanded] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [tokenInput, setTokenInput] = useState("")
  const [owner, setOwner] = useState(DEFAULT_CONFIG.owner)
  const [repo, setRepo] = useState(DEFAULT_CONFIG.repo)
  const [branch, setBranch] = useState(DEFAULT_CONFIG.branch)

  const {
    status,
    enabled,
    autoPush,
    lastSyncAt,
    error,
    message,
    syncNow,
    enable,
    disable,
    setAutoPush,
  } = cloudSync

  const handleEnable = useCallback(async () => {
    if (!tokenInput.trim()) return
    await enable({
      token: tokenInput.trim(),
      owner: owner.trim() || DEFAULT_CONFIG.owner,
      repo: repo.trim() || DEFAULT_CONFIG.repo,
      branch: branch.trim() || DEFAULT_CONFIG.branch,
    })
    setTokenInput("")
  }, [tokenInput, owner, repo, branch, enable])

  const statusBadge = enabled ? (
    status === "syncing" ? (
      <span className="flex items-center gap-1 rounded bg-primary/15 px-1.5 py-0.5 text-xs font-medium text-primary">
        <RefreshCw className="h-3 w-3 animate-spin" />
        同步中
      </span>
    ) : status === "error" ? (
      <span className="flex items-center gap-1 rounded bg-destructive/15 px-1.5 py-0.5 text-xs font-medium text-destructive">
        <AlertCircle className="h-3 w-3" />
        同步失败
      </span>
    ) : (
      <span className="flex items-center gap-1 rounded bg-emerald-500/15 px-1.5 py-0.5 text-xs font-medium text-emerald-500">
        <CheckCircle2 className="h-3 w-3" />
        已连接
      </span>
    )
  ) : (
    <span className="flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
      <CloudOff className="h-3 w-3" />
      未启用
    </span>
  )

  return (
    <div className="rounded border border-border bg-card">
      {/* 收起状态：状态栏 */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center gap-2 px-4 py-2.5 text-left transition-colors hover:bg-muted/50"
      >
        <Cloud className={`h-4 w-4 ${enabled ? "text-primary" : "text-muted-foreground"}`} />
        <span className="text-sm font-medium text-foreground">云同步</span>
        {statusBadge}
        {enabled && (
          <span className="text-xs text-muted-foreground">
            上次同步：{formatTime(lastSyncAt)}
          </span>
        )}
        <span className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
          {enabled && autoPush && <span className="hidden sm:inline">笔记变化 5 秒后自动备份</span>}
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </span>
      </button>

      {/* 展开内容 */}
      {expanded && (
        <div className="border-t border-border px-4 py-3">
          {!enabled ? (
            /* ---------- 未启用：配置表单 ---------- */
            <div className="space-y-3">
              <p className="text-xs leading-relaxed text-muted-foreground">
                将学习笔记、问答记录、角色进度、工具记录自动备份到 GitHub 仓库的
                <code className="mx-1 rounded bg-muted px-1 py-0.5 text-[11px]">user-data</code>
                分支，清缓存 / 换设备后可一键找回。数据只同步到你的私有 token 对应的仓库。
              </p>

              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">
                  GitHub Personal Access Token
                </label>
                <input
                  type="password"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  placeholder="ghp_... 或 github_pat_..."
                  autoComplete="off"
                  className="w-full rounded border border-border bg-muted px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                  创建入口：
                  <a
                    href="https://github.com/settings/tokens/new?scopes=repo&description=%E7%9F%A5%E8%AF%86%E5%AE%87%E5%AE%99%E4%BA%91%E5%90%8C%E6%AD%A5"
                    target="_blank"
                    rel="noreferrer"
                    className="mx-0.5 inline-flex items-center gap-0.5 text-primary hover:underline"
                  >
                    生成 Classic Token（勾选 repo 权限）
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  。更安全的做法：用 Fine-grained Token，只授权本仓库、只开 Contents 读写权限。
                </p>
              </div>

              {/* 高级设置 */}
              <div>
                <button
                  onClick={() => setShowAdvanced((v) => !v)}
                  className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Settings2 className="h-3.5 w-3.5" />
                  高级设置（仓库 / 分支）
                </button>
                {showAdvanced && (
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <div>
                      <label className="mb-1 block text-[11px] text-muted-foreground">所有者</label>
                      <input
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                        className="w-full rounded border border-border bg-muted px-2 py-1 text-xs text-foreground focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[11px] text-muted-foreground">仓库</label>
                      <input
                        value={repo}
                        onChange={(e) => setRepo(e.target.value)}
                        className="w-full rounded border border-border bg-muted px-2 py-1 text-xs text-foreground focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[11px] text-muted-foreground">分支</label>
                      <input
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        className="w-full rounded border border-border bg-muted px-2 py-1 text-xs text-foreground focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleEnable}
                  disabled={!tokenInput.trim() || status === "syncing"}
                  className="flex items-center gap-1.5 rounded bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "syncing" ? (
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Cloud className="h-3.5 w-3.5" />
                  )}
                  启用并立即同步
                </button>
                <span className="text-[11px] text-muted-foreground">
                  Token 只保存在本浏览器（localStorage），不会写入网站代码
                </span>
              </div>
            </div>
          ) : (
            /* ---------- 已启用：状态与操作 ---------- */
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => void syncNow()}
                  disabled={status === "syncing"}
                  className="flex items-center gap-1.5 rounded border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${status === "syncing" ? "animate-spin" : ""}`} />
                  {status === "syncing" ? "同步中..." : "立即同步"}
                </button>
                <label className="flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={autoPush}
                    onChange={(e) => setAutoPush(e.target.checked)}
                    className="h-3.5 w-3.5 accent-primary"
                  />
                  自动备份（数据变化 5 秒后推送）
                </label>
                <button
                  onClick={disable}
                  className="ml-auto rounded border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
                >
                  停用
                </button>
              </div>

              <div className="rounded bg-muted/50 px-3 py-2 text-[11px] leading-relaxed text-muted-foreground">
                <p>同步范围：学习笔记、问答记录、角色进度、工具记录（4 类数据合并为一份 JSON，存于 <code className="rounded bg-muted px-1">user-data</code> 分支根目录）</p>
                <p>合并规则：按记录 ID 取并集，多设备同时使用也不会互相覆盖；删除操作不会同步（云端视为回收站，可在 GitHub 网页上手动清理）</p>
              </div>
            </div>
          )}

          {/* 状态反馈 */}
          {message && !error && (
            <p className="mt-3 flex items-center gap-1.5 text-xs text-emerald-500">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
              {message}
            </p>
          )}
          {error && (
            <p className="mt-3 flex items-start gap-1.5 text-xs text-destructive">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span className="leading-relaxed">{error}</span>
            </p>
          )}
        </div>
      )}
    </div>
  )
}
