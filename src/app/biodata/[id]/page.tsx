import { axiosPublic } from '@/lib/axios'
import type { Biodata } from '@/types/biodata'
import type { PageProps } from '@/types/next'

export default async function BiodataDetailsPage({ params }: PageProps<{ id: string }>) {
  const { id } = await params
  let biodata: Biodata | null = null
  try {
    const res = await axiosPublic.get<Biodata>(`/biodata-details/${id}`)
    biodata = res.data
  } catch {
    biodata = null
  }

  if (!biodata) return <p className="p-8 text-center">Biodata not found.</p>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{biodata.Name}</h1>
      <p>Age: {biodata.Age}</p>
      <p>Occupation: {biodata.Occupation}</p>
      <p>Division: {biodata.PresentDivision}</p>
    </div>
  )
}
