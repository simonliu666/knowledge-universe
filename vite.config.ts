import path from 'path'
import { defineConfig } from '@lark-apaas/coding-preset-vite-react'

// GitHub Pages 部署时使用子路径 /knowledge-universe/
// 本地开发时使用根路径 /
const base = process.env.GITHUB_PAGES ? '/knowledge-universe/' : '/'

export default defineConfig({
  base,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, 'shared'),
    },
  },
})
