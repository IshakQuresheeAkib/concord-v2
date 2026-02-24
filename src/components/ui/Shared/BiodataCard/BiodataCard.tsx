import Link from 'next/link'
import Image from 'next/image'
import type { Biodata } from '@/types/biodata'
import type { JSX } from 'react'
import './BiodataCard.css'

interface BiodataCardProps {
  biodata: Biodata
}

export default function BiodataCard({ biodata }: BiodataCardProps): JSX.Element {
  return (
    <div className="biodata-card rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-white w-72 flex flex-col">
      <div className="relative w-full h-52">
        <Image
          src={biodata.ProfileImageLink}
          alt={biodata.Name}
          fill
          sizes="288px"
          className="object-cover"
        />
        {biodata.IsPremium && (
          <span className="absolute top-3 right-3 bg-teal text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            Premium
          </span>
        )}
        <span
          className={`absolute top-3 left-3 text-white text-xs font-semibold px-2 py-0.5 rounded-full ${
            biodata.BiodataType === 'Male' ? 'bg-blue-500' : 'bg-pink-400'
          }`}
        >
          {biodata.BiodataType}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1 gap-1">
        <h3 className="text-lg font-bold text-gray-800 truncate">{biodata.Name}</h3>
        <p className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">Age:</span> {biodata.Age}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">Occupation:</span> {biodata.Occupation}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">Division:</span> {biodata.PermanentDivision}
        </p>

        <Link
          href={`/biodata/${biodata._id}`}
          className="biodata-card-btn mt-auto inline-flex items-center justify-center gap-1 text-sm font-semibold text-teal border border-teal rounded-full py-1.5 px-4 transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
