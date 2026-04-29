'use client'

import { useSelector } from 'react-redux'
import { useGetUsersQuery } from "@/store/infoSlice"


export default function Profile() {
  const user = useSelector((state: any) => state.user.user)

  const { data , isLoading } = useGetUsersQuery()

  // Find matching user from fetched data
  const matchedUser = data?.find((u: any) => u.email === user?.email)
  
  // Default name for test account or unknown users
  const displayName = matchedUser?.name || (user?.email === 'test@test.com' ? 'Test User' : '')

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      <div className="card">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Name</label>
            <p className="text-lg font-medium mt-1">
              {displayName }
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address</label>
            <p className="text-lg font-medium mt-1 text-gray-500">
              {user?.email || (
                <span className="text-gray-500 animate-pulse italic">Loading email...</span>
              )}
            </p>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone Number</label>
            <p className="text-lg font-medium mt-1">
              {matchedUser?.phone }
            </p>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Address</label>
            <p className="text-lg font-medium mt-1">
              {matchedUser?.address?.street }, {matchedUser?.address?.suite}, {matchedUser?.address?.city}
            </p>
          </div>
          
          
          <div className="pt-4 border-t border-[var(--border)]">
            <p className="text-sm text-gray-500">
              This information is retrieved from your secure session.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}