import { ReactNode } from "react"

type Props = {
  children: ReactNode
}
const Center = ({ children }: Props) => {
  return (
    <div className="mx-auto grid min-h-screen  place-items-center px-4 pb-32 pt-8">
      <div className="max-w-4xl rounded-xl p-3 shadow-2xl">{children}</div>
    </div>
  )
}

export default Center
