import { createSlice } from "@reduxjs/toolkit"
import { FieldValue } from "firebase/firestore"

import { RootState } from "../config/store"

type NOS = null | string
type Path = { id: string; name: string }[]

export type Folder = {
  name: string
  createdAt?: FieldValue
  id?: string
  parentId: NOS
  path: Path
}

type InitialState = {
  folder: Folder
  childFiles: string[]
  childFolder: string[]
}

const ROOT_FOLDER: Folder = {
  parentId: null,
  name: "Root",
  path: [],
}

const initialState: InitialState = {
  childFiles: [],
  childFolder: [],
  folder: ROOT_FOLDER,
}

const folder = createSlice({
  name: "folder",
  initialState,
  reducers: {},
})

export const {} = folder.actions

export const getFolder = (state: RootState) => state.folder

export default folder.reducer
