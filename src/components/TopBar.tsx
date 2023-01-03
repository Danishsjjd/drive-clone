import { MouseEventHandler, useState } from "react"
import { AiFillFolderAdd, AiFillFileAdd } from "react-icons/ai"
import { IconType } from "react-icons/lib/esm/iconBase"
import InputDialog from "./form/InputDialog"

const TopBar = () => {
  const [isInputDialogOpen, setIsInputDialogOpen] = useState(false)
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

      <InputDialog
        isOpen={isInputDialogOpen}
        setIsOpen={setIsInputDialogOpen}
      />
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
