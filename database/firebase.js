import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: "AIzaSyBsylR-sPIuUZWNSg0OwuLfP1QHDCaqQJ4",
	authDomain: "chat-app-40161.firebaseapp.com",
	projectId: "chat-app-40161",
	storageBucket: "chat-app-40161.appspot.com",
	messagingSenderId: "1011384453861",
	appId: "1:1011384453861:web:ae636718f10667cdbde20c"
};

const app = initializeApp(firebaseConfig);

// metodos GET, PUT e SELECT
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)
