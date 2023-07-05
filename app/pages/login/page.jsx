"use client"

// Imports do React
import Image from 'next/image'
import Link from 'next/link'
import { IoLogoGoogle, IoLogoFacebook, IoLogoGithub, IoLogoTwitter } from 'react-icons/io'

// Import Flash Messages
import ToastMessage from '@components/ToastMessage'
import { toast } from 'react-toastify'

// Import Métodos de Autenticação, o Auth ja vem configurado
import { auth } from '@database/firebase'
import { signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, TwitterAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth'

// Import do Hook do Context (Variavel Universal)
import { useAuth } from '@utils/authContext'

// Import Funções React
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Loader from '@components/Loader'

// Declaração dos Providers
const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()
const githubProvider = new GithubAuthProvider()
const twitterProvider = new TwitterAuthProvider()

const login = () => {

	// Funções do Router e pegar valores do Hook do Context
	const router = useRouter()
	const { currentUser, isLoading } = useAuth()

	const [email, setEmail] = useState("")

	// Verificar se está logado pelo Hook
	useEffect(() => {
		if (!isLoading && currentUser) {
			// quer dizer que o usuário está logado
			router.push("/")
		}
	}, [currentUser, isLoading])

	// Enviar e Verificar crendiciais de login
	const handleSubmit = async (e) => {

		e.preventDefault()
		const email = e.target[0].value
		const password = e.target[1].value

		try {

			await signInWithEmailAndPassword(auth, email, password)

		} catch (error) {
			console.log(error)
		}

	}

	// Funções de Sign In feitas através do firebase 
	const signInWithGoogle = async () => {
		try {
			await signInWithPopup(auth, googleProvider)
		} catch (error) {
			console.error(error)
		}
	}

	const signInWithFacebook = async () => {
		try {
			await signInWithPopup(auth, facebookProvider)
		} catch (error) {
			console.error(error)
		}
	}

	const signInWithGithub = async () => {
		try {
			await signInWithPopup(auth, githubProvider)
		} catch (error) {
			console.error(error)
		}
	}

	const signInWithTwitter = async () => {
		try {
			await signInWithPopup(auth, twitterProvider)
		} catch (error) {
			console.error(error)
		}
	}

	// Configuração da Flash Message
	const resetPassword = async () => {
		try {
			toast.promise(async () => {
				// Código de Recuperação de Senha
				await sendPasswordResetEmail(auth, email)
			}, {
				pending: 'Gerando link de Recuperação de Senha',
				success: 'Recuperação de senha enviada no email registrado!',
				error: 'Verifique o email utilizado Acima'
			}, {
				autoClose: 5000
			})
		} catch (error) {
			console.log(error)
		}
	}

	// Código Principal
	return isLoading || (!isLoading && currentUser) ? (
		<Loader />
	) : (
		<div className='bg'>
			<ToastMessage />
			<div className='bg-container'>

				<div className='login-actions'>
					<Image src="/assets/images/undraw_login_re_4vu2.svg" alt='Imagem' width={500} height={350} className='login-image' />
					<h1 className='title'>
						Faça Login na sua Conta
					</h1>
					<p className='subtitle'>
						Conecte-se e converse com qualquer pessoa, de qualquer lugar!
					</p>
					<div className='icons-container'>
						<div onClick={signInWithFacebook}>
							<IoLogoFacebook size={30} />
						</div>
						<div onClick={signInWithGoogle}>
							<IoLogoGoogle size={30} />
						</div>
						<div onClick={signInWithGithub}>
							<IoLogoGithub size={30} />
						</div>
						<div onClick={signInWithTwitter}>
							<IoLogoTwitter size={30} />
						</div>
					</div>

					<p className='change-form'>
						- OU -
					</p>

					<form className='login-form' onSubmit={handleSubmit}>
						<input type="email" name="email" id="email" className='form-input' placeholder='Digite seu Email' autoComplete='off' onChange={(e) => setEmail(e.target.value)} required />
						<input type="password" name="senha" id="senha" className='form-input' placeholder='Digite sua senha' autoComplete='off' required />
						<p className='forgot-password' onClick={resetPassword}>
							Esqueceu a senha?
						</p>
						<div className='links-login-register'>
							<button type='submit'>
								Fazer Login
							</button>
						</div>
					</form>
					<Link href="/pages/register" className='link-login'>
						<p>Ainda não é membro?</p>
						<span>
							Registre-se agora
						</span>
					</Link>

				</div>


			</div>
		</div >
	)
}

export default login