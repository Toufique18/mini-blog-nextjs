// app/api/posts/route.ts

import { NextResponse } from 'next/server'

export async function GET() {
  const posts = [
    { id: 1, title: 'My Post 1', body: 'Hello world' },
    { id: 2, title: 'My Post 2', body: 'Learning RTK Query' },
  ]

  return NextResponse.json(posts)
}