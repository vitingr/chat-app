"use client"

// Imports Firebase
import { db } from '@database/firebase'
import { collection, doc, getDocs, query, where } from 'firebase/firestore'

// Imports React
import React from 'react'
import { useState } from 'react'

// Imports Components
import Avatar from './Avatar'

// Import Icons
import { IoSearchSharp } from 'react-icons/io5'

const Search = () => {

	const [username, setUsername] = useState("")
	const [user, setUser] = useState(null)
	const [error, setError] = useState(false)

	const onkeyup = async (e) => {
		console.log("A")
		try {
			setError(false);
			const usersRef = collection(db, "users");
			console.log("A")
			const q = query(usersRef, where("displayName", "==", username));
			console.log("A")

			console.log(username)

			const querySnapshot = await getDocs(q);
			console.log("A")
			if (querySnapshot.empty) {
				console.log("B")
				setError(true);
				setUser(null);
			} else {
				console.log("C")
				querySnapshot.forEach((doc) => {
					setUser(doc.data());
				});
			}
		} catch (error) {
			console.error(error);
			setError(error);
		}
	}

	return (
		<div className='search-container'>
			<div className='flex-search'>
				<div className='search-input'>
					<input type="text" name="userSearch" id="userSearch" value={username} placeholder='Procure algum usuário' onChange={(e) => setUsername(e.target.value)} onKeyUp={onkeyup} autoFocus className='popup-input' />
				</div>
				<div className='icon-cursor'>
					<IoSearchSharp size={20} />
				</div>
			</div>

			<div className='searched-container'>
				{user && (
					<>
						<div className='searched-friend'>
							{/* <div className='add-friend-container' onClick={() => handleSelect(user)}> */}
							<div className='left-add-friend'>
								<Avatar size={50} user={user} />
							</div>
							<div className='right-add-friend'>
								<h3>
									{user.displayName}
								</h3>
								<p>
									{user.email}
								</p>
							</div>
						</div>
					</>
				)}
			</div>


		</div>
	)
}

export default Search