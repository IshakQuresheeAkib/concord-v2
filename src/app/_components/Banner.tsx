import type { JSX } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MdSend } from 'react-icons/md'
import PrimaryBtn from '@/components/ui/Shared/Button/PrimaryBtn'
import Navbar from '@/components/ui/Shared/Navbar/Navbar'

export default function Banner(): JSX.Element {
  return (
    <div>
      <Navbar />
      <div className="relative h-screen">
        <Image
          src="https://i.ibb.co/3Y0rF47/Untitled-designff-1.png"
          alt="Concord banner"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/10 to-black/5" />
        <svg
          className="absolute inset-x-0 bottom-0 text-white"
          viewBox="-60 0 1200 155"
        >
          <path
            fill="currentColor"
            d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
          />
        </svg>
        <div className="relative mx-auto overflow-hidden sm:max-w-xl md:max-w-full 2xl:w-screen lg:px-24 px-8 xl:pt-44 py-28 2xl:py-36 h-full xl:-bottom-14 2xl:bottom-0">
          <div className="flex flex-col items-center justify-between xl:flex-row" data-aos="fade-bottom">
            <div className="w-full 2xl:max-w-2xl max-w-3xl 2xl:pt-10 xl:pr-6 xl:w-7/12">
              <h2 className="mb-3 text-4xl font-bold sm:text-5xl text-black">
                Find Love, Build Dreams!<br />
                Your Journey Begins With Concord!
              </h2>
              <p className="max-w-xl mb-6 text-xs text-black/80 sm:text-lg">
                Embark on a wonderful journey at Concord, where you can explore the beauty of
                relationships as you navigate through a space that celebrates the simplicity and
                warmth of genuine connections.
              </p>
              <Link href="/about-us" className="w-fit rounded-full block">
                <PrimaryBtn data="Learn More" icon={<MdSend />} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
