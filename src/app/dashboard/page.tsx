// 'use client'

// import { useRouter } from 'next/navigation'

// export default function Dashboard() {
//   const router = useRouter()

//   const handleLogout = async () => {
//     await fetch('/api/logout', { method: 'POST' })
//     router.push('/login')
//   }

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   )
// }
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import * as jwt from 'jsonwebtoken'
import LogoutButton from '../components/LogoutButton'
const SECRET = 'mysecretkey'

export default async function Dashboard() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    redirect('/login')
  }

  try {
    const user = jwt.verify(token, SECRET)

    return (
      <div>
        <h1>Dashboard</h1>
        <p>Welcome {(user as any).email}</p>
        <LogoutButton />
      </div>
    )
  } catch (err) {
    redirect('/login')
  }
}