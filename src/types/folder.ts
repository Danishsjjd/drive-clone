import { FieldValue } from "firebase/firestore"

export type NOS = null | string

export type Path = { id: string; name: string }

export type Folder = {
  name: string
  id?: string
  parentId: NOS
  path: Path[]
}

export interface FolderWithUID extends Folder {
  userId: string
  createdAt: FieldValue
}
