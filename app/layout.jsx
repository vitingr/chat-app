import "@style/global.css"

export const metadata = {
  title: 'Concord App',
  description: 'O grande rival do Discord',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <main>
        {children}
        </main>
      </body>
    </html>
  )
}
