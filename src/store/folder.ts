import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "../config/store"
import { File } from "../types/file"
import { Folder, NOS, Path } from "../types/folder"

export const ROOT_FOLDER: Folder = {
  parentId: null,
  name: "Root",
  path: [],
}

type InitialState = {
  folder: Folder
  childFiles: File[]
  childFolder: Folder[]
}

const initialState: InitialState = {
  childFiles: [],
  childFolder: [],
  folder: ROOT_FOLDER,
}

const folder = createSlice({
  name: "folder",
  initialState,
  reducers: {
    setFolderInitial: (
      state,
      action: PayloadAction<{
        folder: Folder | undefined
        folderId: NOS | undefined
      }>
    ) => {
      let { folderId, folder } = action.payload
      folder = folder || ROOT_FOLDER
      if (folderId == null)
        return {
          ...state,
          folder: ROOT_FOLDER,
        }

      return {
        ...state,
        folder,
        childFiles: [],
        childFolder: [],
      }
    },
    setFolder: (state, action: PayloadAction<Folder>) => {
      state.folder = action.payload
    },
    setChildFolder: (state, action: PayloadAction<Folder[]>) => {
      state.childFolder = action.payload
    },
    setChildFiles: (state, action: PayloadAction<File[]>) => {
      state.childFiles = action.payload
    },
  },
})

export const { setFolderInitial, setChildFolder, setFolder, setChildFiles } =
  folder.actions

export const getFolder = (state: RootState) => state.folder

export default folder.reducer
