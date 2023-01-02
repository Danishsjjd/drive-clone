import { configureStore, StateFromReducersMapObject } from "@reduxjs/toolkit"

import auth from "../store/auth"

const reducer = {
  auth,
}

const store = configureStore({
  reducer,
})

export type RootState = StateFromReducersMapObject<typeof reducer>
export type AppDispatch = typeof store.dispatch

export default store
