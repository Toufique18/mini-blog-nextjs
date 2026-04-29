
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const SECRET = 'mysecretkey' // later move to .env

export async function POST(req: Request) {
  const { email, password } = await req.json()

  //fetch users from API
  const res = await fetch('http://localhost:3001/users')
  const users = await res.json()


  // find user by email or check for test account
  const user = users.find((u: any) => u.email === email)
  const isTestAccount = email === 'test@test.com'

  if ((user || isTestAccount) && password === '1234') {
    const token = jwt.sign(
      { email }, // payload
      SECRET,
      { expiresIn: '1h' }
    )

    const res = NextResponse.json({ success: true })

    res.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
    })

    return res
  }

  return NextResponse.json({ error: 'Invalid' }, { status: 401 })
}