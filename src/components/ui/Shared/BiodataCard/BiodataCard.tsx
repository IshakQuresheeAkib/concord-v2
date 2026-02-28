import type { JSX } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineLocationOn, MdSend } from 'react-icons/md'
import { TfiBag } from 'react-icons/tfi'
import type { Biodata } from '@/types/biodata'
import PrimaryBtn from '@/components/ui/Shared/Button/PrimaryBtn'
import './BiodataCard.css'

interface BiodataCardProps {
  biodata: Biodata
}

const isValidImageUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}


export default function BiodataCard({ biodata }: BiodataCardProps): JSX.Element {
  const {
    BiodataId,
    ProfileImageLink,
    Age,
    Occupation,
    PermanentDivision,
    PresentDivision,
    Name,
  } = biodata

  const imageSrc = isValidImageUrl(ProfileImageLink) ? ProfileImageLink : null

  const divisionText =
    PresentDivision !== PermanentDivision
      ? `I originally come from ${PermanentDivision}, and currently, I reside in ${PresentDivision}.`
      : `I'm originally from ${PermanentDivision}, and I currently reside here too.`

  return (
    <div
      className="group w-full mt-7 2xl:max-w-sm max-w-xs overflow-hidden rounded-lg shadow-lg"
      data-aos="slide-up"
    >
      <div className="flex items-center px-2 py-3 bg-teal">
        <div className="relative w-32 h-32 shrink-0 rounded-full overflow-hidden bg-white/20 flex items-center justify-center">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={Name}
              fill
              sizes="128px"
              className="object-cover"
            />
          ) : (
            <CgProfile className="w-16 h-16 text-white/70" />
          )}
        </div>
        <div className="text-left ml-3">
          <h1 className="text-lg font-semibold text-white">{Name}</h1>
          <p className="pt-1 text-white/80 text-sm">{divisionText}</p>
        </div>
      </div>

      <div className="px-3 py-6 text-left duration-700 transition group-hover:bg-teal">
        <h1 className="text-xl font-semibold group-hover:text-white">
          Biodata ID: {BiodataId}
        </h1>

        <div className="flex items-center mt-4 text-gray-700 group-hover:text-white">
          <CgProfile className="w-5 h-5" />
          <span className="px-2 text-sm">{Age} years old</span>
        </div>

        <div className="flex items-center mt-4 text-gray-700 group-hover:text-white">
          <MdOutlineLocationOn className="w-5 h-5" />
          <span className="px-2 text-sm">{PresentDivision}</span>
        </div>

        <div className="flex items-center mt-4 text-gray-700 group-hover:text-white">
          <TfiBag className="w-5 h-5" />
          <span className="px-2 text-sm">{Occupation}</span>
        </div>

        <div className="pt-7 mx-auto w-fit">
          <Link href={`/biodata/${BiodataId}`}>
            <PrimaryBtn data="View Profile" icon={<MdSend />} />
          </Link>
        </div>
      </div>
    </div>
  )
}
