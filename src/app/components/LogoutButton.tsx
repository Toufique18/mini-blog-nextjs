'use client'

import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/userSlice'

export default function LogoutButton() {
  const router = useRouter()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' })
      dispatch(logout())
      router.push('/login')
      router.refresh()
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  return (
    <button 
      onClick={handleLogout}
      className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors cursor-pointer"
    >
      Logout
    </button>
  )
}