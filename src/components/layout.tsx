import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <div className="relative z-10 min-h-screen w-full">
      <Outlet />
    </div>
  )
}
