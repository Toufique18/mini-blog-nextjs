import Link from 'next/link'

export default function Navbar() {
  return (
    <nav style={{ display: 'flex', gap: '10px' }}>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/dashboard">Dashboard</Link>
<Link href="/dashboard/profile">Profile</Link>
<Link href="/blog/1">Blog 1</Link>
    </nav>
  )
}