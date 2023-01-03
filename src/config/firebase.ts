import { initializeApp, getApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAW13TsnbSYtEjb-lExmmuuMXEr5B8g4vk",
  authDomain: "drive-67bc9.firebaseapp.com",
  projectId: "drive-67bc9",
  storageBucket: "drive-67bc9.appspot.com",
  messagingSenderId: "345523267720",
  appId: "1:345523267720:web:f874df9ce145bfa153d73d",
}

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }
