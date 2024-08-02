import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { Header } from './components/header'
import { Provider } from './_provider'
import { Toaster } from 'sonner'

export const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Solana Wallet',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-950`}>
        <Provider>
          <Header />
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  )
}
