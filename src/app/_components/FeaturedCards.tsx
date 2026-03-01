'use client'

import type { JSX } from 'react'
import type { AxiosResponse } from 'axios'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import type { Biodata } from '@/types/biodata'
import { axiosSecure } from '@/lib/axios'
import BiodataCard from '@/components/ui/Shared/BiodataCard/BiodataCard'
import Heading from '@/components/ui/Shared/Heading/Heading'

export default function FeaturedCards(): JSX.Element {
  const { data } = useQuery<AxiosResponse<Biodata[]>>({
    queryKey: ['premiumBiodatas'],
    queryFn: () => axiosSecure.get<Biodata[]>('/biodatas-premium'),
  })

  const biodatas: Biodata[] = data?.data ?? []

  return (
    <section className="my-36 2xl:mx-auto md:mx-8 relative">
      <Heading>Featured Biodata</Heading>
      <Image
        src="https://i.ibb.co/CzbNRYg/Untitled-designaaa-1.png"
        alt=""
        aria-hidden
        width={256}
        height={256}
        className="absolute xl:-right-20 -right-16 2xl:-top-20 -top-36 md:w-64 w-44 h-auto opacity-30"
      />
      <p className="text-center mt-3 mb-20">
        Explore the beauty of relationships as you navigate through a space!
      </p>
      <div className="flex flex-wrap justify-center gap-11">
        {biodatas.map((biodata) => (
          <BiodataCard biodata={biodata} key={biodata._id} />
        ))}
      </div>
    </section>
  )
}
