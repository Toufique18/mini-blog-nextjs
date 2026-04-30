import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const SECRET = 'mysecretkey' // should be in .env
const DB_URL = 'http://localhost:3001/users'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // 1. Fetch existing users to check if email exists
    const usersRes = await fetch(DB_URL)
    const users = await usersRes.json()

    const userExists = users.find((u: any) => u.email === email)
    if (userExists) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    // 2. Create new user
    const newUser = {
      name,
      email,
      password, // In a real app, hash this!
      username: email.split('@')[0], // simple username generation
      createdAt: new Date().toISOString()
    }

    const saveRes = await fetch(DB_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    })

    if (!saveRes.ok) {
      return NextResponse.json({ error: 'Failed to save user' }, { status: 500 })
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      { email, name },
      SECRET,
      { expiresIn: '1h' }
    )

    // 4. Set cookie
    const response = NextResponse.json({ success: true })
    response.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 3600 // 1 hour
    })

    return response
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
