import { AuthError, updatePassword, User } from "firebase/auth"
import { ReactNode, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import Center from "../components/Center"
import AppDialog from "../components/Dialog"
import Input from "../components/form/Input"
import { auth } from "../config/firebase"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import {
  getRefinedFirebaseAuthErrorMessage,
  getUserCredential,
  signOutUser,
  updateUserEmail,
} from "../store/auth"

const Profile = () => {
  const userData = useAppSelector(getUserCredential)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [emailDialog, setEmailDialog] = useState(false)
  const [passwordDialog, setPasswordDialog] = useState(false)

  return (
    <>
      <Center>
        <Field title={"Email"} value={userData?.email} />
        <Field title={"Provider"} value={userData?.providerId} />
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button className="btn-primary btn" onClick={() => navigate(-1)}>
            Back
          </button>
          <button
            className="btn-secondary btn"
            onClick={() => setEmailDialog(true)}
          >
            Change Email
          </button>
          <button
            className="btn-accent btn"
            onClick={() => setPasswordDialog(true)}
          >
            Change Password
          </button>
          <button
            className="btn-error btn"
            onClick={() => dispatch(signOutUser())}
          >
            Logout
          </button>
        </div>
      </Center>
      <UpdateUserEmail isOpen={emailDialog} setIsOpen={setEmailDialog} />
      <UpdateUserPassword
        isOpen={passwordDialog}
        setIsOpen={setPasswordDialog}
      />
    </>
  )
}

type EmailForm = {
  email: string
}

type PasswordForm = {
  password: string
}

function UpdateUserEmail({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailForm>()
  const onSubmit = async (data: EmailForm) => {
    dispatch(updateUserEmail(data.email))
  }
  return (
    <AppDialog isOpen={isOpen} setIsOpen={setIsOpen} title="Update Email">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input<EmailForm>
          errors={errors}
          name="email"
          type={"email"}
          register={register}
          title="Enter New Email"
          validations={{
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          }}
        />
        <button className="btn-primary btn">Update</button>
      </form>
    </AppDialog>
  )
}

function UpdateUserPassword({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordForm>()
  const onSubmit = async (data: PasswordForm) => {
    try {
      await updatePassword(auth.currentUser as User, data.password)
      toast.success("password is updated successfully")
      setIsOpen(false)
    } catch (e) {
      const error = e as AuthError
      toast.error(getRefinedFirebaseAuthErrorMessage(error.message))
    }
  }
  return (
    <AppDialog isOpen={isOpen} setIsOpen={setIsOpen} title="Update User Info">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input<PasswordForm>
          errors={errors}
          name="password"
          type={"password"}
          register={register}
          title="Enter New Password"
          validations={{
            minLength: { value: 8, message: "At least 8 character" },
          }}
        />
        <button className="btn-primary btn">Update</button>
      </form>
    </AppDialog>
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
