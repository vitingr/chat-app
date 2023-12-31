"use client"

import "@style/global.css"
import { UserProvider } from '@utils/authContext'
import { ChatContextProvider } from "@utils/chatContext"

export const metadata = {
  title: 'Concord App',
  description: 'O grande rival do Discord',
}

export default function RootLayout({ children }) {

  return (
    <html lang="pt-br">
      <UserProvider>
        <ChatContextProvider>
          <body>
            <main>
              {children}
            </main>
            <script src="/functions/reveal.js"></script>
            <script src="/functions/revealConfig.js"></script>
          </body>
        </ChatContextProvider>
      </UserProvider>
    </html>
  )
}
