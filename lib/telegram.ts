import { SheetForm } from './types'

const baseURL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_KEY}`
const chatId = process.env.TELEGRAM_CHAT_ID

export const sendMessage = async (message: string): Promise<void> => {
  const url = `${baseURL}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}&parse_mode=Markdown`

  const response = await fetch(url)
  if (!response.ok) {
    const data = await response.json()
    const errorMessage = data ? data.description : 'tg error occurred'
    throw new Error(errorMessage)
  }
}

export function formatMessage({
  name,
  email,
  phone,
  message,
}: SheetForm): string {
  return `
⚡*New Message*
_from:_ ${name}

${message}

${email}
${phone}`
}
