'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/userSlice'

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me')
        if (res.ok) {
          const data = await res.json()
          dispatch(setUser(data.user))
        }
      } catch (err) {
        console.error('Failed to fetch user', err)
      }
    }

    fetchUser()
  }, [dispatch])

  return <>{children}</>
}
