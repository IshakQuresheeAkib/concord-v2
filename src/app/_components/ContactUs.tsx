'use client'

import type { JSX } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { FiPhoneCall } from 'react-icons/fi'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import Heading from '@/components/ui/Shared/Heading/Heading'
import InputField from '@/components/ui/Shared/InputField/InputField'
import { sendContactEmail, type ContactEmailParams } from '@/lib/emailService'

export default function ContactUs(): JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ContactEmailParams>()

  const onSubmit = async (data: ContactEmailParams): Promise<void> => {
    try {
      await sendContactEmail(data)
      toast.success('Message sent successfully!')
      reset()
    } catch {
      toast.error('Failed to send message. Please try again.')
    }
  }

  return (
    <section className="flex justify-center items-center mx-auto sm:w-[90%] mb-52 mt-24" data-aos="fade-up">
      <div className="container mx-auto my-4 px-4 2xl:px-20">

        <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-xl">
          <div className="flex justify-center">
            <Heading>Send us a message</Heading>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 mt-7">
              <InputField
                {...register('from_name', { required: true })}
                type="text"
                label="First Name"
              />
              <InputField
                {...register('last_name', { required: true })}
                type="text"
                label="Last Name"
              />
              <InputField
                {...register('from_email', { required: true })}
                type="email"
                label="Email"
              />
              <InputField
                {...register('phone', { required: true })}
                type="tel"
                label="Phone"
              />
            </div>

            <textarea
              {...register('message', { required: true })}
              placeholder="Message*"
              className="w-full h-32 my-5 bg-gray text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-light-teal shadow font-medium mx-auto py-3 w-44 text-lg hover:bg-white duration-700 rounded-3xl cursor-pointer block disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending…' : 'Submit'}
            </button>
          </form>
        </div>

        <div className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-teal rounded-2xl">
          <div className="flex flex-col text-white">
            <h1 className="font-bold uppercase text-4xl my-4">Drop in our office</h1>
            <p className="text-gray-400">
              Visit Us Today: Where Dreams Meet Reality, Drop by Our Office to Begin Your Journey.
            </p>

            <div className="flex my-4">
              <div className="flex flex-col">
                <HiOutlineBuildingOffice2 className="mt-2 mr-2 text-xl" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-2xl">Main Office</h2>
                <p className="text-gray-400">123 Elm Street, London, SW1A 1AA, United Kingdom</p>
              </div>
            </div>

            <div className="flex my-4">
              <div className="flex flex-col">
                <FiPhoneCall className="mt-2 mr-2 text-xl" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-2xl">Call Us</h2>
                <p className="text-gray-400">Tel: +44 20 1234 5678</p>
                <p className="text-gray-400">Fax: (123)-456-7890</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
