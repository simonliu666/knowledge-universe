import { Routes, Route } from "react-router-dom"
import Layout from "@/components/layout"
import DomainMapPage from "@/pages/DomainMapPage/DomainMapPage"
import PsychologyRPGPage from "@/pages/PsychologyRPGPage/PsychologyRPGPage"
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage"

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<DomainMapPage />} />
        <Route path="psychology" element={<PsychologyRPGPage />} />
        <Route path="gaming" element={<PsychologyRPGPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
