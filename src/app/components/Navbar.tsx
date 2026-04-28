import Link from 'next/link'
import { cookies } from 'next/headers'
import LogoutButton from '../components/LogoutButton'

export default async function Navbar() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  return (
    <nav className="sticky top-0 z-50 bg-opacity-80 backdrop-blur-md border-b border-[var(--border)] bg-[var(--background)]">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex gap-6 items-center">
          <Link href="/" className="font-semibold text-lg tracking-tight">MiniBlog</Link>
          <div className="hidden md:flex gap-4 text-sm font-medium text-[var(--muted)]">
            <Link href="/about" className="hover:text-[var(--foreground)] transition-colors">About</Link>
            <Link href="/contact" className="hover:text-[var(--foreground)] transition-colors">Contact</Link>
            <Link href="/blog/1">Blog 1</Link>
          </div>
        </div>
        
        <div className="flex gap-4 items-center text-sm font-medium">
          {!token ? (
            <Link href="/login" className="btn btn-primary px-4 py-2 text-xs">Login</Link>
          ) : (
            <>
              <Link href="/dashboard" className="hover:text-[var(--primary)] transition-colors">Dashboard</Link>
              <Link href="/dashboard/profile" className="hover:text-[var(--primary)] transition-colors">Profile</Link>
              <LogoutButton />
            </>
          )}
          
        </div>
      </div>
    </nav>
  )
}