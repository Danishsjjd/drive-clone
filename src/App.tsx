import { useAppSelector } from "./hooks/hooks"
import { getUsername } from "./store/auth"

function App() {
  const username = useAppSelector(getUsername)

  return <div className="bg-red-400 text-white">Hello {username}</div>
}

export default App
