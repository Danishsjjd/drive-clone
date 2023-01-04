import { useSelector } from "react-redux"
import { MouseEventHandler } from "react"

import Navbar from "../components/Navbar"
import TopBar from "../components/TopBar"
import useFolder from "../hooks/useFolder"
import { getFolder } from "../store/folder"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const { childFiles, childFolder, folder } = useSelector(getFolder)
  const navigate = useNavigate()
  useFolder()
  return (
    <>
      <Navbar />
      <TopBar currentFolder={folder} />
      {childFolder.length > 0 && (
        <div className="mx-auto mb-8 mt-4 max-w-7xl px-4">
          <h3 className="mb-3 text-lg">Folders</h3>
          <div className="flex flex-wrap gap-3">
            {childFolder.map((folder) => {
              return (
                <Folder
                  name={folder.name}
                  key={folder.id}
                  onClick={() => navigate(`/folder/${folder.id}`)}
                />
              )
            })}
          </div>
        </div>
      )}
      {childFolder.length > 0 && childFiles.length > 0 && <hr />}

      {childFiles.length > 0 && (
        <div className="mx-auto mt-6 mb-3 max-w-7xl px-4">
          <h3 className="mb-3 text-lg">Files</h3>
          <div className="flex flex-wrap gap-3">
            {childFiles.map((file) => (
              <File name={file.name} key={file.id} url={file.url} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

const Folder = ({
  name,
  onClick,
}: {
  name: string
  onClick: MouseEventHandler<HTMLDivElement>
}) => {
  return (
    <div
      className="max-w-[200px] cursor-pointer truncate rounded-xl bg-zinc-600 p-2 font-medium text-white transition-all duration-200 hover:bg-zinc-500"
      onClick={onClick}
    >
      {name}
    </div>
  )
}
const File = ({ name, url }: { name: string; url: string }) => {
  return (
    <a
      className="max-w-[200px] cursor-pointer truncate rounded-xl border-2 border-zinc-500 p-2 transition-all duration-200 hover:border-zinc-400 hover:bg-zinc-400"
      target={"_blank"}
      href={url}
    >
      {name}
    </a>
  )
}
export default Dashboard
