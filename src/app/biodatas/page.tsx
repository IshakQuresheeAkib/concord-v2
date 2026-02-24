'use client'

import { useState, type JSX, type ChangeEvent } from 'react'
import { useQuery } from '@tanstack/react-query'
import { PiSealWarningFill } from 'react-icons/pi'
import { axiosPublic } from '@/lib/axios'
import type { Biodata, BiodataType, Division } from '@/types/biodata'
import Heading from '@/components/ui/Shared/Heading/Heading'
import SubHeading from '@/components/ui/Shared/SubHeading/SubHeading'
import Loader from '@/components/ui/Shared/Loader/Loader'
import BiodataCard from '@/components/ui/Shared/BiodataCard/BiodataCard'
import './biodatas.css'

const LOCATIONS: Array<{ value: Division | ''; label: string }> = [
  { value: '', label: 'All' },
  { value: 'Dhaka', label: 'Dhaka' },
  { value: 'Chattagram', label: 'Chattagram' },
  { value: 'Rangpur', label: 'Rangpur' },
  { value: 'Barisal', label: 'Barisal' },
  { value: 'Khulna', label: 'Khulna' },
  { value: 'Mymensingh', label: 'Mymensingh' },
  { value: 'Sylhet', label: 'Sylhet' },
]

const AGE_MIN = 18
const AGE_MAX = 60

export default function BiodatasPage(): JSX.Element {
  const [biodataType, setBiodataType] = useState<BiodataType | ''>('')
  const [minAge, setMinAge] = useState<number>(AGE_MIN)
  const [maxAge, setMaxAge] = useState<number>(40)
  const [location, setLocation] = useState<Division | ''>('')

  const handleMinAge = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)
    setMinAge(val >= maxAge ? maxAge - 1 : val)
  }

  const handleMaxAge = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)
    setMaxAge(val <= minAge ? minAge + 1 : val)
  }

  const { data: biodatas = [], isPending } = useQuery<Biodata[]>({
    queryKey: ['biodatas', biodataType, minAge, maxAge, location],
    queryFn: async () => {
      const res = await axiosPublic.get<Biodata[]>(
        `/biodatas?type=${biodataType}&maxAge=${maxAge}&minAge=${minAge}&location=${location}`
      )
      return res.data
    },
  })
  console.log('biodatas: ', biodatas);

  const filterControls = (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium mb-2">
          Age Range: {minAge} – {maxAge}
        </p>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-500">
            Min: {minAge}
            <input
              type="range"
              min={AGE_MIN}
              max={AGE_MAX}
              value={minAge}
              onChange={handleMinAge}
              className="w-full mt-1 accent-teal"
            />
          </label>
          <label className="text-xs text-gray-500">
            Max: {maxAge}
            <input
              type="range"
              min={AGE_MIN}
              max={AGE_MAX}
              value={maxAge}
              onChange={handleMaxAge}
              className="w-full mt-1 accent-teal"
            />
          </label>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Permanent Division</p>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value as Division | '')}
          className="w-full border border-gray-200 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal"
        >
          {LOCATIONS.map((loc) => (
            <option key={loc.value} value={loc.value}>
              {loc.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Biodata Type</p>
        <div className="flex flex-col gap-2">
          {(['Male', 'Female', ''] as Array<BiodataType | ''>).map((val) => (
            <label key={val} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name="biodataType"
                value={val}
                checked={biodataType === val}
                onChange={() => setBiodataType(val)}
                className="accent-teal"
              />
              {val === '' ? 'All' : val}
            </label>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div>
      {/* Hero banner */}
      <div className="biodatas-hero bg-no-repeat bg-cover w-screen h-96 bg-fixed">
        <div className="lg:pt-44 pt-32 md:w-full w-3/4 mx-auto text-center">
          <Heading>Biodatas</Heading>
          <SubHeading>Explore the beauty of relationships as you navigate through a space</SubHeading>
        </div>
      </div>

      <div className="pb-52 flex">
        {/* Desktop sidebar */}
        <aside className="w-64 lg:block hidden shrink-0 shadow-lg border-t-4 border-teal min-h-screen p-5">
          <h2 className="my-5 text-xl font-bold border-l-teal border-l-4 w-fit pl-2">
            Filter Biodatas
          </h2>
          {filterControls}
        </aside>

        {/* Content area */}
        <div className="flex-1 text-center mt-8 mx-auto px-4">
          {/* Mobile filter bar */}
          <div className="shadow lg:hidden rounded-xl mx-2 grid grid-cols-2 md:grid-cols-3 p-5 gap-y-5 place-items-center mb-8">
            <div className="w-full">
              <p className="text-sm font-medium mb-1">
                Age: {minAge} – {maxAge}
              </p>
              <input
                type="range"
                min={AGE_MIN}
                max={AGE_MAX}
                value={minAge}
                onChange={handleMinAge}
                className="w-full accent-teal"
              />
              <input
                type="range"
                min={AGE_MIN}
                max={AGE_MAX}
                value={maxAge}
                onChange={handleMaxAge}
                className="w-full accent-teal"
              />
            </div>

            <div className="h-fit">
              <p className="text-sm font-medium mb-1">Division</p>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value as Division | '')}
                className="border border-gray-200 rounded-lg text-sm px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc.value} value={loc.value}>
                    {loc.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="h-fit col-span-full md:col-auto">
              <p className="text-sm font-medium mb-1">Biodata Type</p>
              <div className="flex gap-3">
                {(['Male', 'Female', ''] as Array<BiodataType | ''>).map((val) => (
                  <label key={val} className="flex items-center gap-1 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="biodataTypeMobile"
                      value={val}
                      checked={biodataType === val}
                      onChange={() => setBiodataType(val)}
                      className="accent-teal"
                    />
                    {val === '' ? 'All' : val}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Cards grid */}
          <div className="flex gap-8 flex-wrap justify-center mx-auto items-start">
            {isPending ? (
              <Loader width="52" height="96" />
            ) : biodatas.length > 0 ? (
              biodatas.map((biodata) => (
                <BiodataCard key={biodata._id} biodata={biodata} />
              ))
            ) : (
              <div className="mt-16">
                <PiSealWarningFill className="w-fit mx-auto text-8xl text-teal mb-5" />
                <p className="text-gray-500">No Biodata Available!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}