'use client'

import { useState } from 'react'
import { useGetPostsQuery, useDeletePostMutation } from "@/store/infoSlice"

export default function ManagePosts() {
  const { data: posts, isLoading, error } = useGetPostsQuery()
  const [deletePost] = useDeletePostMutation()
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      await deletePost(id).unwrap()
      setMessage({ type: 'success', text: 'Post deleted successfully' })
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to delete post' })
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500">Error loading posts.</div>
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Manage Posts</h1>
        <p className="text-sm text-gray-600">Overview of all blog posts published by users.</p>
      </header>

      {message.text && (
        <div className={`p-4 rounded-lg text-sm ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <div className="bg-white shadow rounded-xl overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts?.map((p: any) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 truncate max-w-md">{p.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.userId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:text-red-900 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
