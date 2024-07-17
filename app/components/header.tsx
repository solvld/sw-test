'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export function Header() {
  const pathname = usePathname()
  return (
    <header className="bg-gray-500/5 w-full text-white py-4 px-4 lg:px-32 flex justify-between items-center">
      {pathname === '/transactions' ? (
        <Link href="/" className="py-1 px-4 rounded-2xl bg-sky-600">
          Back
        </Link>
      ) : (
        <button className="py-1 px-4 rounded-2xl bg-sky-600 hover:bg-sky-500/90 transition-all duration-300">
          Create Wallet
        </button>
      )}
      <div className="flex items-center gap-4">
        <Link
          href="/transactions"
          className="py-1 px-4 rounded-2xl border border-white hover:border-transparent transition-all duration-300 ease-in-out"
        >
          Transactions
        </Link>
        <h1 className="text-lg">{`SOL: 0`}</h1>
      </div>
    </header>
  )
}
