'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
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
import { cn, generateTimeArray, timeNow } from '@/lib/utils'

const FormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email(),
  phone: z.string().min(2),
  message: z.string(),
  dob: z.date({
    required_error: 'A date of birth is required.',
  }),
  hour: z.string().min(1),
  min: z.string().min(1),
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

          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={date => {
                        const now = new Date()
                        const hours = now.getHours()
                        const today = new Date(
                          now.getFullYear(),
                          now.getMonth(),
                          now.getDate(),
                        )

                        // Если сейчас меньше 18:00, то включаем сегодняшнюю дату в диапазон
                        return hours < 18 ? date < today : date <= today
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex space-x-2">
            <FormField
              control={form.control}
              name="hour"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-fit min-w-[5rem]">
                        <SelectValue placeholder="Hour" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {generateTimeArray(timeNow(9), 23).map((hour, i) => {
                        return (
                          <SelectItem key={i} value={hour}>
                            {hour}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="min"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-fit min-w-[5rem]">
                        <SelectValue placeholder="Min" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {generateTimeArray(0, 45, 15).map((minute, i) => {
                        return (
                          <SelectItem key={i} value={minute}>
                            {minute}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? 'Please wait' : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
