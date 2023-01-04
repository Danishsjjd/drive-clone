import { query, where, onSnapshot, orderBy } from "firebase/firestore"
import { useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import justPick from "just-pick"

import { db } from "../config/firebase"
import { getUserCredential } from "../store/auth"
import { setChildFolder, setFolderInitial } from "../store/folder"
import { useAppDispatch, useAppSelector } from "./hooks"

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
    const dbQuery = query(
      db.folders(),
      where("userId", "==", userData?.uid),
      where("parentId", "==", folderId),
      orderBy("createdAt")
    )
    return onSnapshot(dbQuery, (snapshot) => {
      dispatch(
        setChildFolder(
          snapshot.docs.map((doc) =>
            justPick({ id: doc.id, ...doc.data() }, ["id", "name"])
          )
        )
      )
    })
  }, [folderId])
  return null
}

export default useFolder
