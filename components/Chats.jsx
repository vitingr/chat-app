"use clients"

// Imports React
import React, { useEffect } from 'react'

import { useChatContext } from '@utils/chatContext'
import { doc, collection, onSnapshot } from 'firebase/firestore'
import { db } from '@database/firebase'

const Chats = () => {

	const { users, setUsers } = useChatContext()

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

	return (
		<div>

		</div>
	)
}

export default Chats