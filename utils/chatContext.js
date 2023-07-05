"use client"

// Imports React
import React, { useReducer } from 'react'
import { createContext, useContext, useState } from 'react'

// Imports 
import { useAuth } from './authContext'

// Main Code
const chatContext = createContext()

export const ChatContextProvider = ({ children }) => {

	const [users, setUsers] = useState(false)
	const { currentUser } = useAuth()

	const [chats, setChats] = useState([])
	const [selectedChat, setSelectedChat] = useState(null)

	const INITIAL_STATE = {
		chatId: "",
		user: null
	}

	// O reducer funciona como uma maneira de alterar propriedades de uma funcao, tipo um useState mais complexo
	const chatReducer = (state, action) => {
		switch (action.type) {
			case "CHANGE_USER":
				return {
					user: action.playload,
					chatId: currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid
				}
			default:
				return state
		}
	}

	const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

	return (
		<chatContext.Provider value={{
			users, setUsers, date: state, dispatch, chats, setChats, selectedChat, setSelectedChat
		}}>
			{children}
		</chatContext.Provider>
	)
}

export const useChatContext = () => useContext(chatContext)
