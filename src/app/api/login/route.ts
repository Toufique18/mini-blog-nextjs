import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const SECRET = 'mysecretkey' // later move to .env

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (email === 'test@test.com' && password === '1234') {
    const token = jwt.sign(
      { email }, // payload
      SECRET,
      { expiresIn: '1h' }
    )

    const res = NextResponse.json({ success: true })

    res.cookies.set('token', token, {
      httpOnly: true,
    })

    return res
  }

  return NextResponse.json({ error: 'Invalid' }, { status: 401 })
}