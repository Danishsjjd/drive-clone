import { Dialog, Transition } from "@headlessui/react"
import { addDoc, serverTimestamp } from "firebase/firestore"
import { Dispatch, Fragment, SetStateAction } from "react"
import { useForm } from "react-hook-form"

import { db } from "../../config/firebase"
import { useAppSelector } from "../../hooks/hooks"
import { getUserCredential } from "../../store/auth"

import Input from "./Input"

type FormData = {
  name: string
}

export default function InputDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm<FormData>()

  const userData = useAppSelector(getUserCredential)

  const submit = async ({ name }: FormData) => {
    try {
      await addDoc(db.folders(), {
        name,
        userId: userData?.uid as string,
        parentId: null,
        createdAt: serverTimestamp(),
      })
      setIsOpen(false)
      reset()
    } catch (e) {
      console.log("error is", e)
    }
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Enter Folder Name
                </Dialog.Title>
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
