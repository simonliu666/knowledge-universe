import { Link } from "react-router-dom"

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="text-muted-foreground">页面未找到，返回主页继续探索心理学的奥秘</p>
      <Link
        to="/"
        className="rounded border border-border px-6 py-2 text-foreground transition hover:bg-muted"
      >
        返回主页
      </Link>
    </div>
  )
}
