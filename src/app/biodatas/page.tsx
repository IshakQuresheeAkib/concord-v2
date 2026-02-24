// app/biodatas/page.tsx
import { axiosPublic } from '@/lib/axios'
import { Biodata } from '@/types/biodata'

async function getBiodatas() {
  try {
    const response = await axiosPublic.get('/api/biodatas')
    return response.data
  } catch (error) {
    console.error('Error fetching biodatas:', error)
    return []
  }
}

export default async function BiodatasPage() {
  const biodatas: Biodata[] = await getBiodatas()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Biodatas</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {biodatas.map((biodata) => (
          <div key={biodata.BiodataId} className="border rounded-lg p-4">
            <img 
              src={biodata.ProfileImageLink} 
              alt={biodata.Name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold">{biodata.Name}</h3>
            <p className="text-gray-600">Age: {biodata.Age}</p>
            <p className="text-gray-600">Occupation: {biodata.Occupation}</p>
            <p className="text-gray-600">Division: {biodata.PresentDivision}</p>
          </div>
        ))}
      </div>
    </div>
  )
}