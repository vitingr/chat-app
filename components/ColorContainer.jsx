// Imports React
import React from 'react'
import { IoCloseOutline, IoShareOutline, IoCheckmark, IoTrashOutline } from 'react-icons/io5'

// Imports Components
import { profileColors } from '@utils/constants'

const ColorContainer = ({ setEditProfile, user, handleClick }) => {
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

      <div className='send-photo'>
        <button class="button" type="button">
          <span class="button__text">Enviar Foto</span>
          <span class="button__icon">
            <IoShareOutline size={20} />
          </span>
        </button>
      </div>

    </div >
  )
}

export default ColorContainer