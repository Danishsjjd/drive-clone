import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { v4 } from "uuid"
import { addDoc, serverTimestamp } from "firebase/firestore"
import React, { MouseEventHandler, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { AiFillFileAdd, AiFillFolderAdd } from "react-icons/ai"
import { IconType } from "react-icons/lib/esm/iconBase"

import { db, storage } from "../config/firebase"
import { useAppSelector } from "../hooks/hooks"
import { getUserCredential } from "../store/auth"
import { ROOT_FOLDER } from "../store/folder"
import { Folder } from "../types/folder"
import Dialog from "./Dialog"
import Input from "./form/Input"
import MiniFolderIcon from "./FolderIcon"
import { Link } from "react-router-dom"

type FormData = {
  name: string
}

type Props = {
  currentFolder: Folder
}

const TopBar = ({ currentFolder }: Props) => {
  const userData = useAppSelector(getUserCredential)
  const [isInputDialogOpen, setIsInputDialogOpen] = useState(false)
  const [loaderPercentage, setLoaderPercentage] = useState(0)

  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm<FormData>()

  const submit = async ({ name }: FormData) => {
    const path =
      currentFolder === ROOT_FOLDER
        ? []
        : [
            ...currentFolder.path,
            { id: currentFolder.id as string, name: currentFolder.name },
          ]
    try {
      await addDoc(db.folders(), {
        name,
        userId: userData?.uid as string,
        parentId: currentFolder.id || null,
        createdAt: serverTimestamp(),
        path,
      })
      setIsInputDialogOpen(false)
      reset()
    } catch (e) {
      toast.error("Something went wrong")
      console.log("error is", e)
    }
  }

  function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (userData?.uid == null) return
    if (e.currentTarget?.files?.[0] != null) {
      const file = e.currentTarget.files[0]
      const path = [
        ...currentFolder.path,
        { id: currentFolder.id, name: currentFolder.name },
      ]
      // same path in the db as folder have
      // after uploading

      const folderPathStr =
        currentFolder === ROOT_FOLDER
          ? ""
          : path.map((fold) => fold.name).join("/")
      const name = file.name

      const lastDot = name.lastIndexOf(".")
      const ext = name.substring(lastDot + 1)

      const uniqueId = v4()
      const pathToSave = `${userData?.uid}/${folderPathStr}/${uniqueId}.${ext}`

      const storageRef = ref(storage, pathToSave)

      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setLoaderPercentage(Math.round(progress))
          switch (snapshot.state) {
            case "paused":
              toast.error("uploading is paused")
              break
            default:
              setLoaderPercentage(0)
              break
          }
        },
        (error) => {
          toast.error("enable to upload")
          console.log("error is", error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(db.files(), {
              createdAt: serverTimestamp(),
              id: uniqueId,
              name,
              parentId: currentFolder.id || null,
              userId: userData.uid,
              url: downloadURL,
            })
          })
        }
      )
    }
  }

  return (
    <div className="mx-auto flex max-w-7xl justify-between py-2 px-3">
      <BreadCrumb currentFolder={currentFolder} />

      <div className="flex gap-3">
        <label>
          <Icon ChildIcon={AiFillFileAdd} />
          <input
            type="file"
            className="hidden"
            onChange={onImageChange}
            max={1}
            maxLength={1}
          />
        </label>
        <Icon
          ChildIcon={AiFillFolderAdd}
          onClick={() => setIsInputDialogOpen(true)}
        />
      </div>

      {loaderPercentage === 0 || loaderPercentage === 100 ? null : (
        <div className="fixed bottom-10 right-10 flex w-full max-w-[120px] items-center justify-center gap-3  ">
          <CircularProgressbar
            value={loaderPercentage}
            text={`${loaderPercentage}%`}
          />
        </div>
      )}

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
              type="submit"
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

const BreadCrumb = ({ currentFolder }: Props) => {
  const path =
    currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER, ...currentFolder.path]
  return (
    <div className="breadcrumbs text-sm">
      <ul>
        {path.map((child, index) => (
          <li
            key={child.id || "Root"}
            className="cursor-pointer hover:underline"
          >
            <MiniFolderIcon />
            <Link
              to={child.id ? `/folder/${child.id}` : "/"}
              className="max-w-[150px] truncate"
              state={{
                folder: { ...child, path: path.slice(1, index) },
              }}
            >
              {child.name}
            </Link>
          </li>
        ))}
        <li>
          <MiniFolderIcon />
          <span>{currentFolder.name}</span>
        </li>
      </ul>
    </div>
  )
}

const Icon = ({
  ChildIcon,
  onClick,
}: {
  ChildIcon: IconType
  onClick?: MouseEventHandler<HTMLDivElement>
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
