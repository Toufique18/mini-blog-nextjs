import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import LoginForm from './LoginForm'
import * as jwt from 'jsonwebtoken'

const SECRET = 'mysecretkey'

export default async function LoginPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (token) {
    try {
      jwt.verify(token, SECRET)
      redirect('/dashboard')
    } catch (err) {
      
    }
  }

  return <LoginForm />
}
