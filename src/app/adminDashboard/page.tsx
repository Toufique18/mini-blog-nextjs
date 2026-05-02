'use client'

import Link from 'next/link'
import { useGetUsersQuery, useGetPostsQuery } from "@/store/infoSlice"

export default function AdminOverview() {
  const { data: users, isLoading: usersLoading } = useGetUsersQuery()
  const { data: posts, isLoading: postsLoading } = useGetPostsQuery()

  const loading = usersLoading || postsLoading

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-2 text-sm text-gray-600">Quick statistics of your application.</p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Link href="/adminDashboard/manageUsers" className="block p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{users?.length || 0}</p>
            </div>
          </div>
        </Link>

        <Link href="/adminDashboard/managePosts" className="block p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg text-green-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2zM14 4v4h4" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Posts</p>
              <p className="text-2xl font-bold text-gray-900">{posts?.length || 0}</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="p-8 bg-blue-50 rounded-2xl border border-blue-100">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Welcome to the Admin Panel</h3>
        <p className="text-blue-700 leading-relaxed">
          Here you can manage all users and their blog posts. Use the sidebar to navigate between different sections. 
          Be careful when deleting data as these actions cannot be undone.
        </p>
      </div>
    </div>
  )
}
