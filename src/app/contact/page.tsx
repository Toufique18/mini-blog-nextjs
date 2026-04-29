'use client'
import { useGetUsersQuery } from '../../store/infoSlice'
export default function Contact() {

  const { data, isLoading, error } = useGetUsersQuery()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return (
    <div>
      <h1>Posts</h1>

      {data.slice(0, 5).map((user: any) => (
        <div key={user.id}>
           <p>{user.name}</p>
           <p>{user.username}</p>
           <p>{user.email}</p>
   </div>
      ))}
    </div>
  )



  
}