import { onAuthStateChanged } from "firebase/auth"
import justPick from "just-pick"
import { useEffect } from "react"
import { Toaster } from "react-hot-toast"
import { useSelector } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import { auth } from "./config/firebase"
import { useAppDispatch } from "./hooks/hooks"
import Router from "./routes/Router"
import {
  addUserData,
  getBeforeLogin,
  getCheckingIsLogin,
  pickCredential,
  removeUserData,
  setLoginChecking,
} from "./store/auth"

function App() {
  const dispatch = useAppDispatch()
  const beforeLogin = useSelector(getBeforeLogin)
  const checkingIfLogin = useSelector(getCheckingIsLogin)

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        const userCredential = justPick(user, pickCredential)
        dispatch(addUserData(userCredential))
      } else {
        dispatch(removeUserData())
      }
      dispatch(setLoginChecking(false))
    })
  }, [])

  if (beforeLogin && checkingIfLogin)
    // TODO: You can use different skeleton for every page just pass skeleton with page to PrivateRoutes
    return (
      <span>
        show app skeleton because user is Login and we are fetching the user
        data
      </span>
    )
  else if (!beforeLogin && checkingIfLogin) {
    return <span>user is not login</span>
  } else
    return (
      <BrowserRouter>
        <Toaster />
        <Router />
      </BrowserRouter>
    )
}

export default App
