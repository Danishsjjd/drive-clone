import {
  Action,
  configureStore,
  StateFromReducersMapObject,
  ThunkAction,
} from "@reduxjs/toolkit"

import auth from "../store/auth"
import folder from "../store/folder"

const reducer = {
  auth,
  folder,
}

const store = configureStore({
  reducer,
})

export type RootState = StateFromReducersMapObject<typeof reducer>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store
