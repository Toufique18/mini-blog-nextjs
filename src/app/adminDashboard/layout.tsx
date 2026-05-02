'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useGetUsersQuery } from "@/store/infoSlice"
import { useEffect } from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const user = useSelector((state: any) => state.user.user)
  const { data: users, isLoading } = useGetUsersQuery()

  const matchedUser = users?.find((u: any) => u.email === user?.email)

  useEffect(() => {
    if (!isLoading && (!matchedUser || matchedUser.role !== 'admin')) {
      router.push('/')
    }
  }, [matchedUser, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!matchedUser || matchedUser.role !== 'admin') {
    return null
  }

  const navItems = [
    { name: 'Dashboard Home', href: '/adminDashboard' },
    { name: 'Manage Users', href: '/adminDashboard/manageUsers' },
    { name: 'Manage Posts', href: '/adminDashboard/managePosts' },
  ]

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-50 border-r border-gray-200 p-6 hidden md:block">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
          Admin Panel
        </h2>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === item.href
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-white">
        {children}
      </main>
    </div>
  )
}
