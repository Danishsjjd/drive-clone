import { Route, Routes } from "react-router-dom"

import Auth from "../pages/Auth"
import Dashboard from "../pages/Dashboard"
import Profile from "../pages/Profile"
import PrivateRoutes from "./PrivateRoutes"
import PublicRoutes from "./PublicRoutes"

const Router = () => {
  return (
    <Routes>
      <Route path="/signUp" element={<PublicRoutes Children={Auth} />} />
      <Route path="/signIn" element={<PublicRoutes Children={Auth} />} />

      <Route path="/" element={<PrivateRoutes Children={Dashboard} />} />
      <Route path="/profile" element={<PrivateRoutes Children={Profile} />} />
    </Routes>
  )
}

export default Router
