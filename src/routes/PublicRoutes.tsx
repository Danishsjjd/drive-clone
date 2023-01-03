import { Navigate } from "react-router-dom"

import { useAppSelector } from "../hooks/hooks"
import { getUserCredential } from "../store/auth"

type Props = {
  redirect?: string
  Children: React.FC
}

const PublicRoutes = ({ redirect = "/", Children }: Props): JSX.Element => {
  const user = useAppSelector(getUserCredential)

  if (user) return <Navigate to={redirect} replace />

  return <Children />
}

export default PublicRoutes
