import Link from "next/link"

async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  return res.json()
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div>
      <h1>All Posts</h1>

      {posts.slice(0, 20).map((post: any) => (
        <div key={post.id} style={{ marginBottom: 10 }}>
          <Link href={`/blog/${post.id}`}>
                 {post.title}
        </Link>
        </div>
      ))}
    </div>
  )
}