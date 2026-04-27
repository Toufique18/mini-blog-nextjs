import Link from "next/link"

async function getPost(id: string) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  )
  return res.json()
}
async function getPosts(id: string) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  )
  return res.json()
}


export default async function Blog({
  params,
}: {
  params: Promise <{ id: string }>
}) {
  const {id} = await params
  const post = await getPost(id)
    const posts = await getPosts(id)


  return (
    <div>
      <h1>Blog {id}</h1>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>{posts.name}</p>
      <Link href={`/blog/${id}/comments`}>
        View Comments  
      </Link> <br />
      <Link href={`/blog`}>
        View All posts
      </Link>
    </div>
  )
}