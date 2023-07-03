"use client"

import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from 'react'
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from '@database/firebase'

const UserContext = createContext()

export const UserProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const clear = async () => {
    try {
      if (currentUser) {
        await updateDoc(doc(db, "users", currentUser?.uid), {
          isOnline: false,
        });
      }
      setCurrentUser(null);
      setIsLoading(false);
    } catch (error) {
      console.log(error)
      console.error(error);
    }
  };

  // vai mudar se está logado ou não
  const authStateChanged = async (user) => {
    setIsLoading(true)
    if (!user) {
      clear()
      return
    }

    const userDocExist = await getDoc(doc(db, "users", user.uid));

    if (userDocExist.exists()) {
      await updateDoc(doc(db, "users", user.uid), {
        isOnline: true,
      });
    }

    // Provavelmente o doc({banco de dados}, {collection}, {parametro})
    const userDoc = await getDoc(doc(db, "users", user.uid), {})

    setCurrentUser(userDoc.data())
    setIsLoading(false)
  }

  const signOut = async () => {
    await authSignOut(auth).then(() => {
      clear()
    })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged)
    return () => unsubscribe()
  }, [])

  return (
    <UserContext.Provider value={{
      currentUser, setCurrentUser,
      isLoading, setIsLoading,
      signOut
    }}>
      {children}
    </UserContext.Provider>
  )
}

export const useAuth = () => useContext(UserContext)
