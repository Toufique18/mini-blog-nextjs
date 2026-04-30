'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { 
  useGetPostsQuery, 
  useGetUsersQuery, 
  useUpdatePostMutation, 
  useDeletePostMutation 
} from "@/store/infoSlice"

export default function MyBlog() {
  const user = useSelector((state: any) => state.user.user)
  const { data: users, isLoading: usersLoading } = useGetUsersQuery()
  const { data: posts, isLoading: postsLoading } = useGetPostsQuery()
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation()
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation()

  const [editingPost, setEditingPost] = useState<any>(null)
  const [editData, setEditData] = useState({ title: '', body: '' })
  const [message, setMessage] = useState({ type: '', text: '' })

  const matchedUser = users?.find((u: any) => u.email === user?.email)
  const myPosts = posts?.filter((post: any) => post.userId === matchedUser?.id)

  const handleEdit = (post: any) => {
    setEditingPost(post)
    setEditData({ title: post.title, body: post.body })
    setMessage({ type: '', text: '' })
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingPost) return

    try {
      await updatePost({ id: editingPost.id, ...editData }).unwrap()
      setMessage({ type: 'success', text: 'Post updated successfully!' })
      setEditingPost(null)
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update post.' })
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id).unwrap()
        setMessage({ type: 'success', text: 'Post deleted successfully!' })
        setTimeout(() => setMessage({ type: '', text: '' }), 3000)
      } catch (err) {
        setMessage({ type: 'error', text: 'Failed to delete post.' })
      }
    }
  }

  if (usersLoading || postsLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Blog Posts</h1>
          <p className="text-gray-600 mt-2">Manage and refine your published stories.</p>
        </div>
        <a 
          href="/dashboard/postBlog" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          Create New Post
        </a>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      {myPosts?.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-dashed border-gray-300 text-center">
          <div className="text-4xl mb-4">✍️</div>
          <p className="text-gray-500 text-lg">You haven't shared any stories yet.</p>
          <a href="/dashboard/postBlog" className="text-blue-600 font-bold mt-4 inline-block hover:underline">
            Start writing today
          </a>
        </div>
      ) : (
        <div className="grid gap-6">
          {myPosts?.map((post: any) => (
            <div key={post.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              {editingPost?.id === post.id ? (
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Title</label>
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Content</label>
                    <textarea
                      value={editData.body}
                      onChange={(e) => setEditData({ ...editData, body: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-40 resize-none"
                      required
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button 
                      type="submit" 
                      disabled={isUpdating}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors font-medium"
                    >
                      {isUpdating ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setEditingPost(null)}
                      className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{post.title}</h2>
                  <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">{post.body}</p>
                  <div className="flex items-center gap-6 pt-4 border-t border-gray-50">
                    <button 
                      onClick={() => handleEdit(post)}
                      className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.242 19.142l3.758-3.758A1 1 0 0020 14.242V9.142a1 1 0 00-.293-.707l-3.758-3.758A1 1 0 0015.242 4H10.142a1 1 0 00-.707.293l-3.758 3.758A1 1 0 005.385 8.758v10.384a1 1 0 001 1h10.384a1 1 0 00.707-.293l3.758-3.758a1 1 0 000-1.414l-3.758-3.758a1 1 0 00-1.414 0l-3.758 3.758a1 1 0 000 1.414z" />
                      </svg>
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(post.id)}
                      disabled={isDeleting}
                      className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-700 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}