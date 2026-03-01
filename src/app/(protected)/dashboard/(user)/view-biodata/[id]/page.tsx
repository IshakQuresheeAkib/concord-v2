export default async function ViewBiodataPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">View Biodata #{id}</h1>
    </div>
  )
}
