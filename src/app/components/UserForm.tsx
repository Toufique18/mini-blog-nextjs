'use client'

import { useState } from 'react'
import { useAddUserMutation } from '@/store/infoSlice'

export default function UserForm() {
  const [addUser] = useAddUserMutation()

  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
  })

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    await addUser(form) //API call

    setForm({
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
    })
  }

  return (
    <form className='grid grid-cols-3 p-4' onSubmit={handleSubmit}>
      <input className='p-4' name="name" placeholder="Name" onChange={handleChange} value={form.name} />
      <input className='p-4' name="username" placeholder="Username" onChange={handleChange} value={form.username} />
      <input className='p-4' name="email" placeholder="Email" onChange={handleChange} value={form.email} />
      <input className='p-4' name="phone" placeholder="Phone" onChange={handleChange} value={form.phone} />
      <input className='p-4' name="website" placeholder="Website" onChange={handleChange} value={form.website} />

      <button className='btn bg-blue-500 text-white' type="submit">Add User</button>
    </form>
  )
}