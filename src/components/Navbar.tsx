import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <header className="bg-slate-300 text-slate-500">
      <div className="mx-auto flex max-w-7xl justify-between px-4 py-6">
        <div
          className="cursor-pointer text-4xl font-medium"
          onClick={() => navigate("/")}
        >
          Danish Drive
        </div>
        <nav
          className="btn-link btn text-xl"
          onClick={() => navigate("/profile")}
        >
          Profile
        </nav>
      </div>
    </header>
  )
}

export default Navbar
