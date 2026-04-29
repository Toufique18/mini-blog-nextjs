'use client'

import {   useGetUsersQuery } from "@/store/infoSlice"

export default function About() {
 const { data } = useGetUsersQuery()

  return (
    <div>
      <h1 className='text-xl font-bold mb-10'>About</h1>

      {data?.slice(0, 4).map((user: any) => (
        <div className="mt-5" key={user.id}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>City: {user.address?.city}</p>
          <p>Street: {user.address?.street}</p>
          
        </div>
      ))}
    </div>
  )
}