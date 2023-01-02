import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  name: "danish",
}

const auth = createSlice({
  name: "Auth-slice",
  initialState,
  reducers: {},
})

export const {} = auth.actions

export default auth.reducer
