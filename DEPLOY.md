# 部署到 GitHub Pages 指南

## 方式一：GitHub Actions 自动部署（推荐）

每次 push 到 `main` 分支会自动构建并部署。

### 步骤

1. **在 GitHub 上创建仓库** `knowledge-universe`（公开仓库）

2. **关联远程仓库并推送**
```bash
git remote add origin https://github.com/<你的用户名>/knowledge-universe.git
git add -A
git commit -m "Initial commit with GitHub Pages deployment"
git branch -M main
git push -u origin main
```

3. **开启 GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 **GitHub Actions**
   - 等待 Actions 运行完成（约 1-2 分钟）

4. **访问站点**
   ```
   https://<你的用户名>.github.io/knowledge-universe/
   ```

### 后续更新
每次 push 到 `main` 分支，GitHub Actions 会自动重新构建部署，无需手动操作。

---

## 方式二：本地手动部署

如果不想用 Actions，可以本地一键部署：

```bash
# 安装 gh-pages 工具（仅需一次）
npm install -D gh-pages

# 一键部署
bash scripts/deploy-gh-pages.sh
```

然后到仓库 Settings → Pages → Source 选择 `gh-pages` 分支。

---

## 配置说明

| 文件 | 作用 |
|------|------|
| `vite.config.ts` | 通过 `GITHUB_PAGES` 环境变量切换 base 路径 |
| `.github/workflows/deploy.yml` | GitHub Actions 自动部署工作流 |
| `scripts/deploy-gh-pages.sh` | 本地手动部署脚本 |

## 技术细节

- 使用 `HashRouter`（`#/route`），无需服务器配置 SPA fallback
- `.nojekyll` 文件阻止 GitHub Pages 的 Jekyll 处理，确保 `_` 开头的资源文件正常加载
- 资源路径通过 Vite `base` 自动适配子路径
