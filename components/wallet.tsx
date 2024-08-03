import React from 'react'

export function Wallet() {
  return (
    <div className="p-4 w-full rounded-xl text-white bg-gray-800 flex flex-col">
      <div className="flex justify-between">
        <span>wallet number:</span>
        <span>$ 0</span>
      </div>
      <div className="flex flex-col">
        <span>private key:</span>
      </div>
    </div>
  )
}
