import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const SECRET = 'mysecretkey' // same as in login/route.ts

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  try {
    const decoded = jwt.verify(token, SECRET) as { email: string }
    return NextResponse.json({ user: { email: decoded.email } })
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }
}
