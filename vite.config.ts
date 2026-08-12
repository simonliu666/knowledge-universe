import path from 'path'
import { defineConfig } from '@lark-apaas/coding-preset-vite-react'

// GitHub Pages 部署时使用子路径 /knowledge-universe/
// 本地开发时使用根路径 /
const base = process.env.GITHUB_PAGES ? '/knowledge-universe/' : '/'

// 构建时间戳（每次 build 时注入）
const BUILD_TIME = new Date().toISOString()

export default defineConfig({
  base,
  define: {
    __BUILD_TIME__: JSON.stringify(BUILD_TIME),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, 'shared'),
    },
  },
})
