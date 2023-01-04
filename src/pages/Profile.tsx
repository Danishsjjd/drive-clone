import { ReactNode } from "react"
import { useNavigate } from "react-router-dom"

import Center from "../components/Center"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { getUserCredential, signOutUser } from "../store/auth"

const Profile = () => {
  const userData = useAppSelector(getUserCredential)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <Center>
      <Field title={"Email"} value={userData?.email} />
      <Field title={"Provider"} value={userData?.providerId} />
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button className="btn-primary btn" onClick={() => navigate(-1)}>
          Back
        </button>
        {/* // TODO: */}
        <button className="btn-secondary btn">Change Email</button>
        <button className="btn-accent btn">Change Password</button>
        <button
          className="btn-error btn"
          onClick={() => dispatch(signOutUser())}
        >
          Logout
        </button>
      </div>
    </Center>
  )
}

type FieldProps = {
  title: ReactNode
  value: ReactNode
}
const Field = ({ title, value }: FieldProps) => {
  return (
    <p className="flex gap-2 text-center text-xl">
      <span>{title}:</span>
      <span className="font-medium text-slate-800">{value}</span>
    </p>
  )
}

export default Profile
