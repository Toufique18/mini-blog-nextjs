import Link from "next/link"

export default async function Blog({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
//<h1>Blog Post ID: {id}</h1>
  return (
    <div>
      <h1>Blog {id}</h1>
      <Link href={`/blog/${id}/comments`}>
        View Comments
      </Link>
    </div>
  )
}