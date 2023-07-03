"use client"

// Imports React
import Link from "next/link"
import { useAuth } from "@utils/authContext"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

// Import Loader
import Loader from "@components/Loader"
import Nav from "@components/Nav"
import Chat from "@components/Chat"
import Sidebar from "@components/Sidebar"

export default function Home() {

  const router = useRouter()
  const { signOut, currentUser, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push("/pages/login")
    } else {
      console.log(currentUser)
    }
  }, [currentUser, isLoading])

  console.log(currentUser)

  return !currentUser ? (
    <Loader />
  ) : (
    <div className="bg no-padding">
      <div className="bg-main">
        <Nav />
        <div className="page-chat">
          <Sidebar />
          <Chat />
        </div>
      </div>
    </div>
    // <div>
    //   <h1>
    //     <Link href="/pages/login" className="text-c1">
    //       Clique Aqui
    //     </Link>
    //   </h1>
    //   <div>
    //     <button onClick={signOut}>
    //       Sing Out
    //     </button>
    //   </div>
    // </div>
  )
}