import Link from "next/link"

async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  return res.json()
}

export default async function LatestPosts() {
  const posts = await getPosts()

  const latest = posts.slice(0, 3)

  return (
    <div>
      <h1>Latest Posts</h1>

      {latest.map((post: any) => (
        <div key={post.id} style={{ marginBottom: 10 }}>
          <p>Blog ID: {post.id}</p>
          <Link href={`/blog/${post.id}`}>
                <h3>{post.title}</h3>
          </Link>
          <p>{post.body}</p>
          
        </div>
      ))}
    </div>
  )
}