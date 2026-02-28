'use client'

import type { JSX } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { MdSend } from 'react-icons/md'
import PrimaryBtn from '@/components/ui/Shared/Button/PrimaryBtn'
import InputField from '@/components/ui/Shared/InputField/InputField'

interface SubscribeFormData {
  email: string
}

export default function SubscribeForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<SubscribeFormData>()

  const onSubmit = (data: SubscribeFormData): void => {
    toast.success(`${data.email} subscribed successfully!`)
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 md:items-center items-start mt-1 md:flex-row"
    >
      <div className="w-3/4">
        <InputField
          {...register('email', { required: true })}
          type="email"
          label="Email"
          variant="dark"
          disabled={isSubmitting}
        />
      </div>
      <PrimaryBtn data="Subscribe" icon={<MdSend />} />
    </form>
  )
}
