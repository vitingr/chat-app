"use client"

// Imports React
import React from 'react'
import { useState } from 'react'
import Image from 'next/image'

// Imports Icons
import { IoIosAdd } from 'react-icons/io'
import { IoLogOutOutline } from 'react-icons/io5'

// Imports Components
import Avatar from './Avatar'
import ColorContainer from './ColorContainer'
import UsersPopup from './popup/UsersPopup'

// Imports Firebase
import { db, auth } from '@database/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { updateProfile } from 'firebase/auth'

// Imports Flash Message
import { toast } from 'react-toastify'

// Imports Context
import { useAuth } from '@utils/authContext'
import ToastMessage from './ToastMessage'

const Nav = () => {

  const { signOut, currentUser, setCurrentUser } = useAuth()
  const [editProfile, setEditProfile] = useState(false)
  const [usersPopup, setUsersPopup] = useState(false)

  const authUser = auth.currentUser

  const handleUpdateProfile = async (type, value) => {
    let obj = { ...currentUser }
    switch (type) {
      case "color":
        obj.color = value
        break
      case "name":
        obj.displayName = value
        break
      case "photo":
        obj.photoURL = value
        break
      case "photo-remove":
        obj.photoURL = null
        break
      default:
        break
    }

    try {
      toast.promise(async () => {
        const userDocRef = doc(db, "users", currentUser.uid)
        await updateDoc(userDocRef, obj)
        setCurrentUser(obj)

        if (type === "photo-remove") {
          await updateProfile(authUser, {
            photoURL: null
          })
        }

        if (type === "name") {
          await updateProfile(authUser, {
            displayName: value
          })
        }

      }, {
        pending: 'Atualizando Perfil',
        success: 'Perfil atualizado com sucesso!',
        error: 'Erro ao atualizar o perfil'
      }, {
        autoClose: 5000
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <ToastMessage />
      <nav className='navbar'>
        {editProfile ? (
          <div className='edit-profile-nav'>
            <div className='avatar-nav'>
              <Avatar user={currentUser} size={60} />
            </div>
            <div className='color-menu'>
              <ColorContainer setEditProfile={setEditProfile} user={currentUser} handleClick={handleUpdateProfile} handleUpdateProfile={handleUpdateProfile} />
            </div>
          </div>
        ) : (
          <div onClick={() => setEditProfile(true)}>
            <Avatar user={currentUser} size={60} />
          </div>
        )}
        <div className='actions-container'>
          <div className='new center' onClick={() => setUsersPopup(!usersPopup)}>
            <IoIosAdd size={30} />
          </div>
          <div className='sign-out-icon center'>
            <button onClick={signOut}>
              <IoLogOutOutline size={30} />
            </button>
          </div>
          {usersPopup && <UsersPopup ShowPopup={setUsersPopup} title={"Find Users"} />}
        </div>
      </nav>
    </div>
  )
}

export default Nav