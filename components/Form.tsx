'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useMutation } from '@tanstack/react-query'
import { SheetForm } from '@/lib/types'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

const FormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email(),
  phone: z.string().min(2),
  message: z.string(),
})

export function InputForm() {
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
      toast({
        title: 'Order success!',
      })
    },
    onError(error) {
      console.error(error)
      toast({
        title: 'Error',
        description: error.message,
      })
    },
  })
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(data)
  }

  useEffect(() => {
    if (isSuccess) {
      form.reset()
    }
  }, [form, isSuccess])

  return (
    <div className="px-8 py-6 w-full lg:w-2/4 mt-8 mx-auto bg-gray-200 rounded-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w- space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Phone" type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Message" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? 'Please wait' : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
