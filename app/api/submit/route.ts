import { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
import { NextResponse } from 'next/server'

interface SheetForm {
  name: string
  email: string
  phone: string
  message: string
}

export async function POST(request: Request) {
  // if (req.method !== 'POST') {
  //   return NextResponse.json({ message: 'Only POST requests are allowed!' })
  // }

  const body = (await request.json()) as SheetForm

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    })

    const sheets = google.sheets({
      auth,
      version: 'v4',
    })

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'A1:D1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[body.name, body.email, body.phone, body.message]],
      },
    })

    return NextResponse.json({
      data: response.data,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'fail' })
  }
}
