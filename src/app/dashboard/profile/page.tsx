'use client'

import { useSelector } from 'react-redux'

export default function Profile() {
  const user = useSelector((state: any) => state.user.user)

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      <div className="card">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">Email Address</label>
            <p className="text-lg font-medium mt-1">
              {user?.email || (
                <span className="text-[var(--muted)] animate-pulse italic">Loading email...</span>
              )}
            </p>
          </div>
          
          <div className="pt-4 border-t border-[var(--border)]">
            <p className="text-sm text-[var(--muted)]">
              This information is retrieved from your secure session.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}