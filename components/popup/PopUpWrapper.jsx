import React from 'react'

import { IoCloseOutline } from 'react-icons/io5'

const PopUpWrapper = ({ children, ShowPopup, title }) => {
	return (
		<div className='popup-wrapper'>
			<div className='glass-effect-popup'>
				<div className='popup-wrapper-normal'>
					<div className='top-popup-wrapper'>
						<h1>{title || ""}</h1>
						<div onClick={() => ShowPopup(false)} className='icon-cursor'>
							<IoCloseOutline size={20} />
						</div>
					</div>
					<div className='content-popup-wrapper'>
						{children}
					</div>
				</div>
			</div>
		</div>
	)
}

export default PopUpWrapper