import { Navigate } from "react-router-dom"

import { useAppSelector } from "../hooks/hooks"
import { getUserCredential } from "../store/auth"

type Props = {
  redirect?: string
  Children: React.FC
}

const PrivateRoutes = ({
  redirect = "/signUp",
  Children,
}: Props): JSX.Element => {
  const user = useAppSelector(getUserCredential)

  if (!user) return <Navigate to={redirect} replace />

  return <Children />
}

export default PrivateRoutes
