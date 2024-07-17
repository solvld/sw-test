import Image from 'next/image'
import { Wallet } from './components/wallet'

export default function Home() {
  return (
    <main className="flex min-h-full p-4 lg:px-32 flex-col items-center justify-between">
      <Wallet />
    </main>
  )
}
