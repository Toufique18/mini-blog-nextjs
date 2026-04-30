'use client'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useGetUsersQuery, useUpdateUserMutation } from "@/store/infoSlice"

export default function Profile() {
  const user = useSelector((state: any) => state.user.user)
  const { data, isLoading: isFetching } = useGetUsersQuery()
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    phone: '',
    password: ''
  })
  const [message, setMessage] = useState({ type: '', text: '' })

  // Find matching user from fetched data
  const matchedUser = data?.find((u: any) => u.email === user?.email)

  useEffect(() => {
    if (matchedUser) {
      setFormData({
        name: matchedUser.name || '',
        username: matchedUser.username || '',
        phone: matchedUser.phone || '',
        password: matchedUser.password || ''
      })
    }
  }, [matchedUser])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!matchedUser) return

    try {
      await updateUser({
        id: matchedUser.id,
        ...formData
      }).unwrap()
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      setIsEditing(false)
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' })
    }
  }

  if (isFetching) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Profile</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Edit Profile
          </button>
        )}
      </div>

      {message.text && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <div className="card shadow-lg rounded-xl overflow-hidden bg-white border border-gray-100">
        <div className="p-6 space-y-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 font-medium"
                >
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="group">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Name</label>
                <p className="text-lg font-medium mt-1 text-gray-900">
                  {matchedUser?.name || 'Not provided'}
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Username</label>
                <p className="text-lg font-medium mt-1 text-gray-900">
                  {matchedUser?.username || 'Not provided'}
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address</label>
                <p className="text-lg font-medium mt-1 text-gray-500">
                  {user?.email || 'Loading...'}
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone Number</label>
                <p className="text-lg font-medium mt-1 text-gray-900">
                  {matchedUser?.phone || 'Not provided'}
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Address</label>
                <p className="text-lg font-medium mt-1 text-gray-900">
                  {matchedUser?.address?.street || 'Not provided'} {matchedUser?.address?.suite || 'Not provided'} {matchedUser?.address?.city || 'Not Provided'}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500 italic">
                  This information is securely stored in your profile.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}