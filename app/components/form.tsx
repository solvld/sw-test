'use client'
import { useMutation } from '@tanstack/react-query'
import React, { FormEvent, useState } from 'react'
import { SheetForm } from '../lib/types'
import { toast } from 'sonner'

export default function Form() {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (formData: SheetForm) => {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (!response.ok) {
        const data = await response.json()
        const errorMessage = data?.message || 'An error occurred'
        throw new Error(errorMessage)
      }
    },
    onSuccess() {
      toast('Order Success')
    },
    onError(error) {
      console.error(error)
      toast(error.message)
    },
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = {
      name,
      email,
      phone,
      message,
    }

    mutate(form)

    setName('')
    setPhone('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className=" mt-8 mx-auto p-16 bg-gray-200 rounded-xl">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center">
          <label htmlFor="name" className="">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="shadow-md rounded-lg p-2"
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="flex flex-col justify-center">
          <label htmlFor="name">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="shadow-md rounded-lg p-2"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="flex flex-col justify-center">
          <label htmlFor="name">Phone</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            className="shadow-md rounded-lg p-2"
            onChange={e => setPhone(e.target.value)}
            value={phone}
          />
        </div>
        <div className="flex flex-col justify-center">
          <label htmlFor="name">Message</label>
          <textarea
            name="message"
            id="message"
            className="shadow-md rounded-lg p-2"
            onChange={e => setMessage(e.target.value)}
            value={message}
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={isPending}
            className="w-64 p-3 shadow rounded-lg bg-indigo-900 text-white disabled:opacity-20 transition-all duration-300"
          >
            submit
          </button>
        </div>
      </form>
    </div>
  )
}
