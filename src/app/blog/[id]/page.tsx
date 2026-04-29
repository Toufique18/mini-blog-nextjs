// import Link from "next/link"

// async function getPost(id: string) {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${id}`
//   )
//   return res.json()
// }
// async function getPosts(id: string) {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/users/${id}`
//   )
//   return res.json()
// }


// export default async function Blog({
//   params,
// }: {
//   params: Promise <{ id: string }>
// }) {
//   const {id} = await params
//   const post = await getPost(id)
//     const posts = await getPosts(id)


//   return (
//     <div>
//       <h1>Blog {id}</h1>
//       <h1>{post.title}</h1>
//       <p>{post.body}</p>
//       <p>{posts.name}</p>
//       <Link href={`/blog/${id}/comments`}>
//         View Comments  
//       </Link> <br />
//       <Link href={`/blog`}>
//         View All posts
//       </Link>
//       <br />
//       <Link href={`/blog/latest`}>
//         View Latest posts
//       </Link>
//     </div>
//   )
// }


// 'use client'

// import { useGetPostsQuery } from '@/store/apiSlice'
// import Link from 'next/link'

// export default function Blog() {
//   const { data, isLoading, error } = useGetPostsQuery()

//   console.log(data)

//   if (isLoading) return <p>Loading...</p>
//   if (error) return <p>Error loading posts</p>

//   return (
//     <div>
//       <h1>Blog Posts</h1>

//       {Array.isArray(data) &&
//         data.slice(0, 5).map((post: any) => (
//           <div key={post.id} style={{ marginBottom: 20 }}>
//             <h3>{post.title}</h3>
//             <p>{post.body}</p>

//             <Link href={`/blog/${post.id}`}>
//               View Post
//             </Link>
//           </div>
//         ))}
//     </div>
//   )
// }


'use client'

import { useGetPostQuery } from '@/store/apiSlice'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function Blog() {
  const params = useParams()

  const { data, isLoading } = useGetPostQuery(params.id as string)

  if (isLoading) return <p>Loading...</p>

  return (
    <div>
      <h1 className='text-xl font-bold md-10'>Blog Posts: {data?.id}</h1>

      <div>
      <h1 className='text-sm font-semibold'>{data?.title}</h1>
      <p className='font-semibold'>{data?.body}</p>

      <Link className='btn btn-blue text-white bg-blue-700' href="/blog">Back to posts</Link>
      <Link className='btn btn-blue text-white bg-blue-700' href="/blog/latest">latest posts</Link>
    </div>
    </div>
  )
}