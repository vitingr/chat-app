"use clients"

// Imports React
import React, { useEffect, useState } from 'react'

import { useChatContext } from '@utils/chatContext'
import { doc, collection, onSnapshot } from 'firebase/firestore'
import { db } from '@database/firebase'
import { IoSearchSharp } from 'react-icons/io5'
import { useAuth } from '@utils/authContext'

const Chats = () => {

	const {currentUser} = useAuth()
	const { users, setUsers, selectedChat, setSelectedChat, chats, setChats } = useChatContext()

	const [search, setSearch] = useState("")

	useEffect(() => {
		// Atualizar dados em tempo real
		onSnapshot(collection(db, "users"), (snapshot) => {
			const updatedUsers = {}
			snapshot.forEach((doc) => {
				updatedUsers[doc.id] = doc.data()
				console.log(doc.data())
			})
			setUsers(updatedUsers)
		})
	}, [])

	useEffect(() => {
		const getChats = async () => {
			const unsub = onSnapshot(doc(db, "usersChats", currentUser.uid), (doc) => {
				if (doc.exists()) {
					const data = doc.data()
					setChats(data)
				} else {
					console.log("Sem Chats")
				}
			})
		}
		currentUser.uid && getChats()
	}, [])

	const filteredChats = Object.entries(chats || {}).sort((a, b) => b[1].date = a[1].date)

	console.log(`CHATS FILTERED: ${filteredChats}`)

	return (
		<div className='chats-container'>
			<div className='search-chat'>
				<input type="text" name="search-chat" id="search-chat" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Buscar conversa...' className='search-chat-input' />
				<div className='icon-cursor'>
					<IoSearchSharp size={20} />
				</div>
			</div>

			<div className='chat-options'>
				{Object.keys(users || {}).length > 0 && filteredChats?.map((chat) => {

					const user = users[chat[1].userInfo.uid]
					return (
						<li className='chat-option-item'>
							<div className='chat'>

							</div>
						</li>
					)
				})}
			</div>

		</div>
	)
}

export default Chats