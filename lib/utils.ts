import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateTimeArray(min: number, max: number, step: number = 1) {
  const result = []
  for (let i = min; i <= max; i += step) {
    if (i < 10) {
      result.push('0' + i.toString())
    } else {
      result.push(i.toString())
    }
  }
  return result
}

export const timeNow = (hour: number): number => {
  const now = new Date()
  const hours = now.getHours()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  if (hours <= 18) {
    return hours
  } else return hour
}
