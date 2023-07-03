"use client"

// Imports React
import React from 'react'
import { IoCloseOutline, IoShareOutline, IoCheckmark, IoTrashOutline } from 'react-icons/io5'
import { MdAddAPhoto, MdPhotoCamera, MdDeleteForever } from "react-icons/md";

// Imports Components
import { profileColors } from '@utils/constants'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, auth, storage } from '@database/firebase'
import { updateProfile } from 'firebase/auth'

// Imports Context
import { useAuth } from '@utils/authContext'

const ColorContainer = ({ setEditProfile, user, handleClick, handleUpdateProfile }) => {

  const { signOut, currentUser } = useAuth()
  const authUser = auth.currentUser

  const uploadImageToFirebase = async (file) => {
    try {
      if (file) {
        // Upload de Arquivo (logica)
        const storageRef = ref(storage, 'images/rivers.jpg');
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            console.log(error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              console.log('File available at', downloadURL);
              handleUpdateProfile("photo", downloadURL)
              await updateProfile(authUser, {
                photoURL: downloadURL
              })
            });
          }
        );
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className='top-color-menu'>
        <h3>Alterar Cor do Perfil</h3>
        <div className='cancel-color-menu center' onClick={() => setEditProfile(false)}>
          <IoCloseOutline size={20} />
        </div>
      </div>

      <div className='bottom-color-menu'>
        {profileColors.map((color, index) => (
          <span key={index} className='color center' style={{ backgroundColor: color }} onClick={() => handleClick("color", color)}>
            {color === user?.color ? (
              <IoCheckmark size={20} />
            ) : (
              <div></div>
            )}
          </span>
        ))}
      </div>

      <div className='photo-actions'>
        <div className='send-photo center'>
          <label htmlFor="fileUpload" className='uploadFile center'>
            {currentUser.photoURL ? (
              <MdPhotoCamera size={34} />
            ) : (
              <IoShareOutline size={34} />
            )}
          </label>
          <input
            id="fileUpload"
            type="file"
            onChange={(e) =>
              uploadImageToFirebase(e.target.files[0])
            }
            style={{ display: "none" }}
          />
        </div>

        {currentUser?.photoURL ? (
          <div className='remove-photo center' onClick={() => handleUpdateProfile("photo-remove")}>
            <MdDeleteForever size={34} />
          </div>
        ) : (
          <div> 

          </div>
        )}
      </div>

    </div >
  )
}

export default ColorContainer