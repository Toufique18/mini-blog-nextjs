'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import LogoutButton from './LogoutButton'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const user = useSelector((state: any) => state.user.user)

  return (
    <nav className="sticky top-0 z-50 bg-opacity-80 backdrop-blur-md border-b border-[var(--border)] bg-[var(--background)]">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex gap-6 items-center">
          <Link href="/" className="font-semibold text-lg tracking-tight">MiniBlog</Link>
          <div className="hidden md:flex gap-4 text-sm font-medium text-[var(--muted)]">
            <Link href="/about" className="hover:text-[var(--foreground)] transition-colors">About</Link>
            <Link href="/contact" className="hover:text-[var(--foreground)] transition-colors">Contact</Link>
            <Link href="/blog">Blog</Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  {user?.email?.[0].toUpperCase() || 'U'}
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {user?.email?.split('@')[0] || 'User'}
                </span>
                <svg className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 z-20 py-1">
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/dashboard/postBlog"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    >
                      Post Blog
                    </Link>
                    <Link
                      href="/dashboard/myBlog"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    >
                      My Blogs
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <div className="px-4 py-2">
                      <LogoutButton />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}