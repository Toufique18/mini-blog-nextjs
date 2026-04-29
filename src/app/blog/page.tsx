// import Link from "next/link"

// async function getPosts() {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts')
//   return res.json()
// }

// export default async function BlogPage() {
//   const posts = await getPosts()

//   return (
//     <div>
//       <h1>All Posts</h1>

//       {posts.slice(0, 20).map((post: any) => (
//         <div key={post.id} style={{ marginBottom: 10 }}>
//           <Link href={`/blog/${post.id}`}>
//                  {post.title}
//         </Link>
//         </div>
//       ))}
//     </div>
//   )
// }

'use client'

import Link from 'next/link'
import { useGetPostsQuery } from '../../store/apiSlice'
import { useState } from 'react'

export default function BlogPage() {
  const { data, isLoading, error } = useGetPostsQuery()

   const [page, setPage] = useState(1)
  const limit = 10

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  const start = (page - 1) * limit
  const end = start + limit
  const paginatedPosts = data.slice(start, end)

  return (
    <div>
      <h1 className='text-2xl font-bold'>All Posts</h1>

      {paginatedPosts.map((post: any) => (
        <div key={post.id}>
          <Link href={`/blog/${post.id}`}>
             <h3 className='font-semibold hover:text-blue-700'>{post.id}. {post.title}</h3>
          </Link>
        </div>
      ))}
       <div className='mt-20 text-center gap-20' >
        <button className='btn btn-blue text-white bg-blue-950 hover:bg-amber-700'
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>

        <button className='btn btn-blue text-white bg-blue-950 hover:bg-amber-700'
          onClick={() => setPage(page + 1)}
          disabled={end >= data.length}
        >
          Next
        </button>
      </div>
    </div>
  )
}