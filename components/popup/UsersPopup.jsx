"use client"

// Imports React
import React from 'react'

// Imports Components
import PopUpWrapper from './PopUpWrapper'
import Avatar from '@components/Avatar'
import Search from '@components/Search'

// Imports Firebase
import { useAuth } from '@utils/authContext'
import { useChatContext } from '@utils/chatContext'
import { db } from '@database/firebase'
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, deleteField } from 'firebase/firestore'

const UsersPopup = ({ ShowPopup, title }) => {

  const { currentUser } = useAuth()
  const { users, dispatch } = useChatContext()

  const handleSelect = async (user) => {
    try {
      const combinedId =
        currentUser.uid > user.uid
          ? currentUser.uid + user.uid
          : user.uid + currentUser.uid;

      // Vai puxar a conversa que tem o ID dos 2 da conversa
      const res = await getDoc(doc(db, "chats", combinedId))

      if (!res.exists()) {
        // Chat Document não existe 
        await setDoc(doc(db, "chats", combinedId), { messages: [] })

        // Vai gerar um doc
        const currentUserChatRef = await getDoc(doc(db, "userChats", currentUser.uid))
        const userChatRef = await getDoc(doc(db, "userChats", user.uid))

        if (!currentUserChatRef.exists()) {
          await setDoc(doc(db, "userChats", currentUser.uid), {});
        }
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL || null,
            color: user.color
          },
          // timestamp = Anotação usada para marcar um campo de carimbo de data/hora a ser preenchido com um carimbo de data/hora do servidor
          [combinedId + ".date"]: serverTimestamp()
        })

        // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-

        if (!userChatRef.exists()) {
          await setDoc(doc(db, "userChats", user.uid), {});
        }
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL || null,
            color: currentUser.color
          },
          // timestamp = Anotação usada para marcar um campo de carimbo de data/hora a ser preenchido com um carimbo de data/hora do servidor
          [combinedId + ".date"]: serverTimestamp()
        })

      } else {
        // Chat Document já existe
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".chatDeleted"]: deleteField(),
        })
      }

      dispatch({ type: "CHANGE_USER", payload: user })
      ShowPopup(false)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <PopUpWrapper ShowPopup={ShowPopup} title={title}>
      <div>
      <Search />
      </div>
      <div className='users-popup-container'>
        {users && Object.values(users).map((user) => (
          <div className='add-friend-container' onClick={() => handleSelect(user)}>
            <div className='left-add-friend'>
              <Avatar size={50} user={user} />
            </div>
            <div className='right-add-friend'>
              <h3>
                {user.displayName}
              </h3>
              <p>
                {user.email}
              </p>
            </div>
          </div>
        ))}
      </div>
    </PopUpWrapper>
  )
}

export default UsersPopup