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
  getFirestore,
} from "firebase/firestore"

import { FolderWithUID } from "../types/folder"

const firebaseConfig = {
  apiKey: "AIzaSyAW13TsnbSYtEjb-lExmmuuMXEr5B8g4vk",
  authDomain: "drive-67bc9.firebaseapp.com",
  projectId: "drive-67bc9",
  storageBucket: "drive-67bc9.appspot.com",
  messagingSenderId: "345523267720",
  appId: "1:345523267720:web:f874df9ce145bfa153d73d",
}

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

// to handle errors properly
const auth: Auth = initializeAuth(app, {
  errorMap: debugErrorMap,
  persistence: browserLocalPersistence,
})

const store = getFirestore(app)

const db = {
  folders: <T = FolderWithUID>() =>
    collection(store, "folders") as CollectionReference<T>,
}

export { auth, db }
