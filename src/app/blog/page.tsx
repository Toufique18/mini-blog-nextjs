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

export default function BlogPage() {
  const { data, isLoading, error } = useGetPostsQuery()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return (
    <div>
      <h1>Posts</h1>

      {data.slice(0, 5).map((post: any) => (
        <p key={post.id}>
          <Link href={`/blog/${post.id}`}>
  <h3>{post.title}</h3>
</Link>
        </p>
      ))}
    </div>
  )
}