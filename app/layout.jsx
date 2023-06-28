import "@style/global.css"
import { UserProvider } from '@utils/authContext'

export const metadata = {
  title: 'Concord App',
  description: 'O grande rival do Discord',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <UserProvider>
        <body>
          <main>
            {children}
          </main>
        </body>
      </UserProvider>
    </html>
  )
}
