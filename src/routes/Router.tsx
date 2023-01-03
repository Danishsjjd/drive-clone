import { Route, Routes } from "react-router-dom"

import Auth from "../pages/Auth"
import Dashboard from "../pages/Dashboard"

const Router = () => {
  return (
    <Routes>
      <Route path="/signIn" element={<Auth />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  )
}

export default Router
