import Link from 'next/link'
import { cookies } from 'next/headers'
import LogoutButton from '../components/LogoutButton'

export default async  function Navbar() {
   const cookieStore = await cookies()
  const token = cookieStore.get('token')
  return (
    <nav style={{ display: 'flex', gap: '10px' }}>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
      {!token ? (
        <Link href="/login">Login</Link>
      ) : (
        <>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/profile">Profile</Link>
          <LogoutButton />
        </>
      )}
      {/*<Link href="/dashboard">Dashboard</Link>
      <Link href="/dashboard/profile">Profile</Link>*/}
      <Link href="/blog/1">Blog 1</Link>
    </nav>
  )
}