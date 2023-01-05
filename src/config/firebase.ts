import { getApp, getApps, initializeApp } from "firebase/app"
import {
  Auth,
  browserLocalPersistence,
  debugErrorMap,
  initializeAuth,
} from "firebase/auth"
import {
  collection,
  CollectionReference,
  DocumentSnapshot,
  getFirestore,
} from "firebase/firestore"
import { getStorage } from "firebase/storage"

import { FirebaseFile } from "../types/file"
import { FolderWithUID } from "../types/folder"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

// to handle errors properly
const auth: Auth = initializeAuth(app, {
  errorMap: debugErrorMap,
  persistence: browserLocalPersistence,
})

const store = getFirestore(app)
const storage = getStorage(app)

const db = {
  folders: <T = FolderWithUID>() =>
    collection(store, "folders") as CollectionReference<T>,
  files: <T = FirebaseFile>() =>
    collection(store, "files") as CollectionReference<T>,
  format: <T extends {}>(doc: DocumentSnapshot<T>): { id: string } & T => ({
    id: doc.id,
    ...(doc.data() as T),
  }),
}

export { auth, db, storage }
