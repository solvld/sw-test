import React from 'react'

export default function Page() {
  return (
    <main className="flex min-h-full p-4 lg:px-32 flex-col items-center justify-between">
      <form className="space-y-4 bg-gray-800 p-4 rounded-xl">
        <input
          placeholder="Amount"
          className="border border-gray-600 p-2 text-white rounded-xl w-full bg-gray-900/5 placeholder:text-gray-400 focus:outline-none"
        />
        <input
          placeholder="Recipient Address"
          className="border border-gray-600 p-2 text-white rounded-xl w-full bg-gray-900/5 placeholder:text-gray-400 focus:outline-none"
        />
        <button className="py-2 px-4 rounded-xl text-white bg-sky-600 hover:bg-sky-500/90 transition-all duration-300">
          Send
        </button>
      </form>
    </main>
  )
}
