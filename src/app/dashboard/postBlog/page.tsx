'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { useGetUsersQuery, useAddPostMutation } from "@/store/infoSlice"

export default function PostBlog() {
  const router = useRouter()
  const user = useSelector((state: any) => state.user.user)
  const { data: users, isLoading: usersLoading } = useGetUsersQuery()
  const [addPost, { isLoading: isSubmitting }] = useAddPostMutation()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [status, setStatus] = useState({ type: '', message: '' })

  const matchedUser = users?.find((u: any) => u.email === user?.email)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!matchedUser) {
      setStatus({ type: 'error', message: 'User not found. Please log in again.' })
      return
    }

    try {
      await addPost({
        userId: matchedUser.id,
        title,
        body
      }).unwrap()

      setStatus({ type: 'success', message: 'Blog post published successfully!' })
      setTitle('')
      setBody('')
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to publish post. Please try again.' })
    }
  }

  if (usersLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Blog Post</h1>
        <p className="mt-2 text-gray-600">Share your thoughts with the world.</p>
      </div>

      {status.message && (
        <div className={`mb-6 p-4 rounded-lg flex items-center ${
          status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          <span className="text-sm font-medium">{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
            Blog Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a catchy title..."
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            required
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-semibold text-gray-700 mb-2">
            Content
          </label>
          <textarea
            id="body"
            rows={8}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            required
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting || !matchedUser}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-700 active:transform active:scale-[0.98] transition-all disabled:bg-blue-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {isSubmitting ? 'Publishing...' : 'Publish Blog Post'}
          </button>
        </div>
      </form>
    </div>
  )
}