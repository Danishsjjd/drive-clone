import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"

import { useAppDispatch } from "../../hooks/hooks"
import { signIn, signUp as firebaseSignUp } from "../../store/auth"
import Input from "./Input"

type FormData = {
  email: string
  password: string
  confirmPassword: string
}

function Form() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormData>({})

  const onSubmit = (data: FormData) => {
    const { confirmPassword, email, password } = data

    if (signUp && password !== confirmPassword)
      return toast.error("password not match")
    else if (signUp) dispatch(firebaseSignUp({ email, password }))
    else dispatch(signIn({ email, password }))
  }

  const signUp = pathname == "/signUp"

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* // TODO: change */}
      <h3 className="mb-4 text-center text-4xl text-slate-700">
        {signUp ? "Sign Up" : "Sign In"}
      </h3>
      <div>
        <Input<FormData>
          name="email"
          register={register}
          title={"Your Email"}
          type="email"
          validations={{
            required: "Enter Your email",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          }}
          errors={errors}
        />
        <Input<FormData>
          name="password"
          register={register}
          title={"Enter Password"}
          type="password"
          validations={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "AtLeast 8 Character",
            },
          }}
          errors={errors}
        />
        {signUp ? (
          <Input<FormData>
            name="confirmPassword"
            register={register}
            title={"Confirm Password"}
            type="password"
            validations={{
              required: "Confirm Password is required",
              minLength: {
                value: 8,
                message: "AtLeast 8 Character",
              },
            }}
            errors={errors}
          />
        ) : null}
      </div>
      <button type="submit" className="btn-primary btn mt-3">
        {signUp ? "Sign Up" : "Sign In"}
      </button>
      <p className="mt-2 flex flex-col items-center justify-center gap-0">
        {signUp ? (
          <span>Already Have Account?</span>
        ) : (
          <span>Not Have Account</span>
        )}
        <button
          className="btn-link btn"
          onClick={() => navigate(!signUp ? "/signUp" : "/signIn")}
          type="button"
        >
          {!signUp ? "Sign Up" : "Sign In"}
        </button>
      </p>
    </form>
  )
}

export default Form
