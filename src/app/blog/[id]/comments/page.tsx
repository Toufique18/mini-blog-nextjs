export default async function Comments({
  params,
}: {
  params: Promise<{ id: string }>
}) {
    const { id } = await params
  return <h1>Comments for blog {id}</h1>
}