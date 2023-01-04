import { addDoc, serverTimestamp } from "firebase/firestore"
import { MouseEventHandler, useState } from "react"
import { useForm } from "react-hook-form"
import { AiFillFileAdd, AiFillFolderAdd } from "react-icons/ai"
import { IconType } from "react-icons/lib/esm/iconBase"

import { db } from "../config/firebase"
import { useAppSelector } from "../hooks/hooks"
import { getUserCredential } from "../store/auth"
import Dialog from "./Dialog"
import Input from "./form/Input"

type FormData = {
  name: string
}

const TopBar = () => {
  const userData = useAppSelector(getUserCredential)
  const [isInputDialogOpen, setIsInputDialogOpen] = useState(false)

  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm<FormData>()

  const submit = async ({ name }: FormData) => {
    try {
      await addDoc(db.folders(), {
        name,
        userId: userData?.uid as string,
        parentId: null,
        createdAt: serverTimestamp(),
        path: [],
      })
      setIsInputDialogOpen(false)
      reset()
    } catch (e) {
      console.log("error is", e)
    }
  }

  return (
    <div className="mx-auto flex max-w-7xl justify-between py-2 px-3">
      <BreadCrumb />

      <div className="flex gap-3">
        <Icon ChildIcon={AiFillFileAdd} onClick={() => {}} />
        <Icon
          ChildIcon={AiFillFolderAdd}
          onClick={() => setIsInputDialogOpen(true)}
        />
      </div>

      <Dialog
        isOpen={isInputDialogOpen}
        setIsOpen={setIsInputDialogOpen}
        title={"Enter Folder Name"}
      >
        <form className="mt-2" onSubmit={handleSubmit(submit)}>
          <Input<FormData>
            title=""
            errors={errors}
            name="name"
            register={register}
            type="text"
          />
          <div className="mt-4">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Create
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  )
}

const BreadCrumb = () => {
  return <div>Bread Crumd</div>
}

const Icon = ({
  ChildIcon,
  onClick,
}: {
  ChildIcon: IconType
  onClick: MouseEventHandler<HTMLDivElement>
}) => {
  return (
    <div
      className="cursor-pointer rounded-lg border-2 border-emerald-300 p-3 text-emerald-400 transition-all hover:bg-emerald-300 hover:text-black"
      onClick={onClick}
    >
      <ChildIcon className="text-xl" />
    </div>
  )
}

export default TopBar
