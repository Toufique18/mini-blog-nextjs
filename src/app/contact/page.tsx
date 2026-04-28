'use client'
import { useGetUsersQuery } from '../../store/infoSlice'
export default function Contact() {

  const { data, isLoading, error } = useGetUsersQuery()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return (
    <div>
      <h1>Posts</h1>

      {data.slice(0, 5).map((post: any) => (
        <p key={post.id}> {post.name}</p>
        <p key={post.id}> {post.username}</p>
        <p key={post.id}> {post.title}</p>
      ))}
    </div>
  )



  
}