import { FieldValue } from "firebase/firestore"
import { NOS } from "./folder"

export type File = {
  parentId: NOS
  id: string
  name: string
  userId: string
  url: string
}

export interface FirebaseFile extends File {
  createdAt: FieldValue
}
