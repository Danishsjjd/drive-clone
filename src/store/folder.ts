import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "../config/store"
import { Folder, NOS, Path } from "../types/folder"

const ROOT_FOLDER: Folder = {
  parentId: null,
  name: "Root",
  path: [],
}

type InitialState = {
  folder: Folder
  childFiles: Path[]
  childFolder: Path[]
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
        folderName: NOS | undefined
        folderId: NOS | undefined
      }>
    ) => {
      let { folderId, folderName } = action.payload
      folderName = folderName || "Root"
      if (folderId == null)
        return {
          ...state,
          folder: ROOT_FOLDER,
        }
      return {
        ...state,
        folder: { ...state.folder, name: folderName, id: folderId },
        childFiles: [],
        childFolder: [],
      }
    },
    setChildFolder: (state, action: PayloadAction<Path[]>) => {
      state.childFolder = action.payload
    },
  },
})

export const { setFolderInitial, setChildFolder } = folder.actions

export const getFolder = (state: RootState) => state.folder

export default folder.reducer
