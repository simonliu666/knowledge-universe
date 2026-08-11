#!/usr/bin/env bash
# 本地一键部署到 GitHub Pages（手动方式，不依赖 GitHub Actions）
# 用法：bash scripts/deploy-gh-pages.sh
set -euo pipefail

REPO_NAME="knowledge-universe"
BRANCH="gh-pages"

echo "📦 Building with GITHUB_PAGES=true..."
GITHUB_PAGES=true npm run build

echo "📄 Adding .nojekyll..."
touch dist/client/.nojekyll

echo "🚀 Deploying to gh-pages branch..."
npx gh-pages -d dist/client -b $BRANCH

echo "✅ Done! Your site will be available at:"
echo "   https://<your-username>.github.io/$REPO_NAME/"
