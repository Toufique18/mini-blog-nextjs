'use client'

import Link from "next/link"

// async function getPosts() {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts')
//   return res.json()
// }

import { useGetPostsQuery } from "@/store/apiSlice"

export default function LatestPosts() {
const { data } = useGetPostsQuery()

  //const posts = data?.slice(0, 3)

  return (
    <div>
      <h1>Latest Posts</h1>

      {data?.slice(0, 3).map((post: any) => (
        <div key={post.id} style={{ marginBottom: 10 }}>
          <p>Blog ID: {post.id}</p>
          <Link href={`/blog/${post.id}`}>
                <h3>Title: {post.title}</h3>
          </Link>
          <p>Description: {post.body}</p>
          
        </div>
      ))}
    </div>
  )
}