'use client'

import { useGetUsersQuery, useDeleteUserMutation } from '@/store/infoSlice'

export default function UsersList() {
  const { data, isLoading } = useGetUsersQuery()
  const [deleteUser] = useDeleteUserMutation()

  if (isLoading) return <p>Loading...</p>

  return (
    <div className='grid grid-cols-4 mt-5'>
      {data?.map((user: any) => (
        <div  className='p-4 border border-gray-500 ' key={user.id}>
          <p>{user.name}</p>
          <button className='btn bg-blue-500 text-white' onClick={() => deleteUser(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}