import { Route, Routes } from "react-router-dom"

import Auth from "../pages/Auth"
import Dashboard from "../pages/Dashboard"
import PrivateRoutes from "./PrivateRoutes"
import PublicRoutes from "./PublicRoutes"

const Router = () => {
  return (
    <Routes>
      <Route path="/signUp" element={<PublicRoutes Children={Auth} />} />
      <Route path="/" element={<PrivateRoutes Children={Dashboard} />} />
    </Routes>
  )
}

export default Router
