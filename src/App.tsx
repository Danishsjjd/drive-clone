import { useAppSelector } from "./hooks/hooks"

function App() {
  const user = useAppSelector((state) => state.auth)

  return <div className="bg-red-400 text-white">Hello {user.name}</div>
}

export default App
