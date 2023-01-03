import Navbar from "../components/Navbar"
import TopBar from "../components/TopBar"

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <TopBar />
      <div className="mx-auto mb-8 mt-4 max-w-7xl px-4">
        <h3 className="mb-3 text-4xl">Folders</h3>
        <div className="flex flex-wrap gap-3">
          <Folder name="lorem3333333333333333333333333333333" />
          <Folder name="Let's ogoo" />
        </div>
      </div>
      <hr />
      <div className="mx-auto mt-6 mb-3 max-w-7xl px-4">
        <h3 className="mb-3 text-4xl">Files</h3>
        <div className="flex flex-wrap gap-3">
          <File name="Hello I'm little file please download me" />
          <File name="bro i'm not a folder" />
        </div>
      </div>
    </>
  )
}

const Folder = ({ name }: { name: string }) => {
  return (
    <div className="max-w-[200px] cursor-pointer truncate rounded-xl bg-zinc-600 p-2 font-medium text-white transition-all duration-200 hover:bg-zinc-500">
      {name}
    </div>
  )
}
const File = ({ name }: { name: string }) => {
  return (
    <div className="max-w-[200px] cursor-pointer truncate rounded-xl border-2 border-zinc-500 p-2 transition-all duration-200 hover:border-zinc-400 hover:bg-zinc-400">
      {name}
    </div>
  )
}
export default Dashboard
