import React from 'react'
import Image from 'next/image'
import { IoLogoGoogle, IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from 'react-icons/io'

const login = () => {
	return (
		<div className='login-bg'>
			<div className='login-container'>

				<div className='login-actions'>
					<Image src="/images/assets/undraw_login_re_4vu2.svg" width={500} height={500} className='login-image' />
					<h1 className='title'>
						Faça Login na sua Conta
					</h1>
					<p className='subtitle'>
						Conecte-se e converse com qualquer pessoa, de qualquer lugar!
					</p>
					<button>
						Fazer Login
					</button>
					<div className='icons-container'>
						<div>
							<IoLogoFacebook size={25} />
						</div>
						<div>
							<IoLogoGoogle size={25} />
						</div>
						<div>
							<IoLogoInstagram size={25} />
						</div>
						<div>
							<IoLogoTwitter size={25} />
						</div>
					</div>
				</div>


			</div>
		</div>
	)
}

export default login