import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../config/store"

const initialState = {
  name: "danish",
}

const auth = createSlice({
  name: "Auth-slice",
  initialState,
  reducers: {},
})

export const {} = auth.actions

export const getUsername = (state: RootState) => state.auth.name

export default auth.reducer
