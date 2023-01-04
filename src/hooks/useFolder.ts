import {
  query,
  where,
  onSnapshot,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore"
import { useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import justPick from "just-pick"

import { db } from "../config/firebase"
import { getUserCredential } from "../store/auth"
import {
  setChildFiles,
  setChildFolder,
  setFolder,
  setFolderInitial,
} from "../store/folder"
import { useAppDispatch, useAppSelector } from "./hooks"
import { Folder } from "../types/folder"

const useFolder = () => {
  const dispatch = useAppDispatch()
  const userData = useAppSelector(getUserCredential)

  const params = useParams()
  const { state } = useLocation()

  const folderName = state?.folderName || null
  const folderId = params?.folderId || null

  useEffect(() => {
    dispatch(
      setFolderInitial({
        folderId: folderId,
        folderName: folderName,
      })
    )
  }, [folderName, folderId])

  useEffect(() => {
    if (folderId) {
      const docRef = doc(db.folders(), folderId)
      async function fetchFolder() {
        const folder = await getDoc(docRef)
        const folderData = { id: folder.id, ...folder.data() }
        dispatch(
          setFolder(
            justPick(folderData as Folder, ["id", "name", "parentId", "path"])
          )
        )
      }
      fetchFolder()
    }

    const folderQuery = query(
      db.folders(),
      where("userId", "==", userData?.uid),
      where("parentId", "==", folderId),
      orderBy("createdAt")
    )
    const unSubFolder = onSnapshot(folderQuery, (snapshot) => {
      dispatch(
        setChildFolder(
          snapshot.docs.map((doc) =>
            justPick({ id: doc.id, ...doc.data() }, ["id", "name"])
          )
        )
      )
    })

    const filesQuery = query(
      db.files(),
      where("userId", "==", userData?.uid),
      where("parentId", "==", folderId),
      orderBy("createdAt")
    )
    const unSubFiles = onSnapshot(filesQuery, (snapshot) => {
      dispatch(
        setChildFiles(
          snapshot.docs.map((doc) =>
            justPick(doc.data(), ["id", "name", "parentId", "url", "userId"])
          )
        )
      )
    })
    return () => {
      unSubFolder()
      unSubFiles()
    }
  }, [folderId])
  return null
}

export default useFolder
