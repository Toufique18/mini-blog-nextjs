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
import UserForm from '../components/UserForm'
import UsersList from '../components/UsersList'
const SECRET = 'mysecretkey'

export default async function Dashboard() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  const res = await fetch('http://localhost:3001/users')
  const users = await res.json()

  if (!token) {
    redirect('/login')
  }

  try {
    const user = jwt.verify(token, SECRET)

    const matchUser = users.find((u: any) => u.email === user.email)

    return (
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {matchUser.name}!</h1>
          <p className="text-gray-600 mt-2">Here's an overview of the community.</p>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Community Members</h2>
          </div>
          <UsersList />
        </div>
      </div>
    )
  } catch (err) {
    redirect('/login')
  }
}