import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  AuthError,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  User,
  UserInfo,
} from "firebase/auth"
import justPick from "just-pick"
import { toast } from "react-hot-toast"

import { auth as firebaseAuth } from "../config/firebase"
import { AppThunk, RootState } from "../config/store"

type CredentialData = { email: string; password: string }

export const pickCredential: (keyof UserInfo)[] = [
  "displayName",
  "email",
  "uid",
  "phoneNumber",
  "photoURL",
  "providerId",
]

type InitialState = {
  user: UserInfo | null
  beforeLogin: boolean
  checkingIfLogin: boolean
}

const initialState: InitialState = {
  user: null,
  beforeLogin: JSON.parse(localStorage.getItem("isLogin") || "false") == true,
  checkingIfLogin: true,
}

const auth = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    addUserData: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload
      localStorage.setItem("isLogin", "true")
    },
    removeUserData: (state) => {
      state.user = null
      localStorage.setItem("isLogin", "false")
    },
    setLoginChecking: (state, action: PayloadAction<boolean>) => {
      state.checkingIfLogin = action.payload
    },
    updateAppUserEmail: (state, action: PayloadAction<string>) => {
      if (state.user) state.user = { ...state.user, email: action.payload }
      else return state
    },
  },
})

export const {
  addUserData,
  removeUserData,
  setLoginChecking,
  updateAppUserEmail,
} = auth.actions

export const signUp =
  (data: CredentialData): AppThunk =>
  async (dispatch) => {
    toast
      .promise(
        createUserWithEmailAndPassword(firebaseAuth, data.email, data.password),
        {
          error: (e) => {
            const error = e as AuthError
            return getRefinedFirebaseAuthErrorMessage(error.message)
          },
          loading: "Validating",
          success: "Successfully Login",
        }
      )
      .then(({ user }) => {
        const userCredential = justPick(user, pickCredential)
        dispatch(addUserData(userCredential))
      })
  }

export const signIn =
  (data: CredentialData): AppThunk =>
  async (dispatch) => {
    toast
      .promise(
        signInWithEmailAndPassword(firebaseAuth, data.email, data.password),
        {
          error: (e) => {
            const error = e as AuthError
            return getRefinedFirebaseAuthErrorMessage(error.message)
          },
          loading: "Validating",
          success: "Successfully Login",
        }
      )
      .then(({ user }) => {
        const userCredential = justPick(user, pickCredential)
        dispatch(addUserData(userCredential))
      })
  }

export const signOutUser = (): AppThunk => async (dispatch) => {
  try {
    await signOut(firebaseAuth)
    dispatch(removeUserData())
  } catch (e) {
    console.log(e)
  }
}

export const updateUserEmail =
  (email: string): AppThunk =>
  async (dispatch) => {
    try {
      await updateEmail(firebaseAuth.currentUser as User, email)
      dispatch(updateAppUserEmail(email))
      toast.success("Email Successfully update")
    } catch (e) {
      const error = e as AuthError
      toast.error(getRefinedFirebaseAuthErrorMessage(error.message))
    }
  }

export const getUserCredential = (state: RootState) => state.auth.user
export const getBeforeLogin = (state: RootState) => state.auth.beforeLogin
export const getCheckingIsLogin = (state: RootState) =>
  state.auth.checkingIfLogin

export function getRefinedFirebaseAuthErrorMessage(
  errorMesssage: string
): string {
  return errorMesssage.replace("Firebase: ", "").replace(/\(auth.*\)\.?/, "")
}

export default auth.reducer
