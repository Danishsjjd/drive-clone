import { ErrorMessage } from "@hookform/error-message"
import {
  DeepMap,
  FieldError,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form"

type InputProps<T extends {}> = {
  title: string
  type: React.HTMLInputTypeAttribute
  errors: Partial<DeepMap<T, FieldError>>
  name: Path<T>
  register: UseFormRegister<T>
  className?: string
  validations?: RegisterOptions
}

const Input = <T extends {}>({
  title,
  type,
  className,
  name,
  register,
  validations,
  errors,
  ...props
}: InputProps<T>) => {
  return (
    <label>
      <h3 className="pb-2">{title}</h3>
      <input
        type={type}
        className={`input-primary input min-w-[20rem] ${
          className ? className : ""
        }`}
        {...register(name, validations)}
        {...props}
      />
      <ErrorMessage
        errors={errors}
        name={name as any}
        render={({ message }) => {
          return <p className="mt-1 text-red-600">{message}</p>
        }}
      />
    </label>
  )
}
export default Input
