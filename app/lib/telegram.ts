const baseURL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_KEY}`
const chatId = process.env.TELEGRAM_CHAT_ID

export const sendMessage = async (message: string): Promise<void> => {
  const url = `${baseURL}/sendMessage?chat_id=${chatId}&text=${message}`

  const response = await fetch(url)
}
