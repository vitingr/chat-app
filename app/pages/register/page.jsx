"use client"

// Imports do React
import Image from 'next/image'
import Link from 'next/link'
import { IoLogoGoogle, IoLogoFacebook, IoLogoGithub, IoLogoTwitter } from 'react-icons/io'
import Loader from '@components/Loader'

// Import Flash Messages
import ToastMessage from '@components/ToastMessage'
import { toast } from 'react-toastify'

// Import Métodos de Autenticação, o Auth ja vem configurado
import { auth, db } from '@database/firebase'
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, TwitterAuthProvider, signInWithPopup } from 'firebase/auth'

// Import do Hook do Context (Variavel Universal)
import { useAuth } from '@utils/authContext'

// Import Funções React
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { doc, setDoc } from 'firebase/firestore'

// Import Cores do Perfil
import { profileColors } from '@utils/constants'

// Declaração dos Providers
const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()
const githubProvider = new GithubAuthProvider()
const twitterProvider = new TwitterAuthProvider()

const register = () => {

	const router = useRouter()
	const { currentUser, isLoading } = useAuth()

	// Verificar se está logado pelo Hook
	useEffect(() => {
		if (!isLoading && currentUser) {
			// quer dizer que o usuário está logado
			router.push("/")
		}
	}, [currentUser, isLoading])

	// Cadastro de Conta com Email e Senha
	const handleSubmit = async (e) => {

		e.preventDefault()
		const displayName = e.target[0].value
		const email = e.target[1].value
		const password = e.target[2].value  
		const confirmPassword = e.target[3].value
		const colorIndex = Math.floor(Math.random() * profileColors.length)

		try {
			if (password === confirmPassword) {
				if (password.length >= 8) {
					if (password.length <= 30) {
						const { user } = await createUserWithEmailAndPassword(auth, email, password)
						console.log(user)
		
						await updateProfile(user, {
							displayName
						})
						
						await setDoc(doc(db, "users", user.uid), {
							uid: user.uid,
							displayName,
							email,
							color: profileColors[colorIndex]
						})
		
						await setDoc(doc(db, "userChats", user.uid), {})
						router.push("/")

					} else {
						// Senha muito longa
						alertPassword("A senha é muito longa!")
					}
				} else {
					// Senha muito curta
					alertPassword("A senha é muito curta!")
				}
			} else {
				// Senhas divergentes
				alertPassword("Verifique as senhas informadas, elas estão diferentes!")
			}
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
	const alertPassword = (mensagem) => {
		toast.error(mensagem)
	}

	// Código Principal
	return isLoading || (!isLoading && currentUser) ? (
		<Loader />
	) : (
		<div className='bg'>
			<ToastMessage />
			<div className='bg-container'>

				<div className='login-actions'>
					<Image src="/images/assets/undraw_informed_decision_p2lh.svg" alt="Image" width={500} height={350} className='login-image' />
					<h1 className='title'>
						Crie a sua Conta
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
						<input type="text" name="nome" id="nome" className='form-input' placeholder='Digite um nome de Usuário' autoComplete='off' required />
						<input type="email" name="email" id="email" className='form-input' placeholder='Digite seu Email' autoComplete='off' required />
						<input type="password" name="senha1" id="senha1" className='form-input' placeholder='Digite sua senha' minLength={8} maxLength={30} autoComplete='off' required />
						<input type="password" name="senha2" id="senha2" className='form-input' placeholder='Confirme sua senha' minLength={8} maxLength={30} autoComplete='off' required />
						<div className='links-login-register'>
							<button type='submit'>
								Registrar-se
							</button>
						</div>
					</form>
					<Link href="/pages/login" className='link-login'>
						<p>Já é membro?</p>
						<span>
							Faça Login
						</span>
					</Link>

				</div>


			</div>
		</div>
	)
}

export default register