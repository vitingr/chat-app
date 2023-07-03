"use client"

// Imports React
import React from 'react'
import Image from 'next/image'

const Avatar = ({ size, user, onClick }) => {
  
  return (
    <div className='avatar-container center'>
      {user?.photoURL ? (
        <div>
          <Image src={user?.photoURL} alt="Avatar" width={size} height={size} className='avatar' />
        </div>
      ) : (
        <div className='profile-letter center' style={{backgroundColor: user?.color, width: size, height: size}}>
          {user?.displayName?.charAt(0)}
        </div>
      )}
      {user?.isOnline ? (
        <div className='online'> </div>
      ) : (
        <div className='offline'> </div>
      )}
    </div>
  )
}

export default Avatar