'use client'
import { useSelector } from 'react-redux'
export default function Profile() {
 const user = useSelector((state: any) => state.user.user)

  return <div>email: {user?.email}</div>
}