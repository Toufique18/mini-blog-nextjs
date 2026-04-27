import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (email === 'test@test.com' && password === '1234') {
    const res = NextResponse.json({ success: true })

    res.cookies.set('token', 'abc123', {
      httpOnly: true,
    })

    return res
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
}