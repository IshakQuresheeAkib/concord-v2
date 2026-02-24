'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { axiosPublic } from '@/lib/axios'
import { useState, type FormEvent, type JSX } from 'react'
import { toast } from 'sonner'

interface SignupPayload {
  name: string
  email: string
  password: string
}

interface SignupResponse {
  user: { _id: string; email: string; name: string; role: string }
}

export default function SignupPage(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    const payload: SignupPayload = {
      name: fd.get('name') as string,
      email: fd.get('email') as string,
      password: fd.get('password') as string,
    }

    try {
      await axiosPublic.post<SignupResponse>('/api/auth/signup', payload)
      const result = await signIn('credentials', {
        email: payload.email,
        password: payload.password,
        redirect: false,
      })
      if (result?.ok) {
        toast.success('Account created!')
        router.push('/dashboard')
      } else {
        toast.error('Signup succeeded but auto-login failed. Please log in.')
        router.push('/login')
      }
    } catch {
      toast.error('Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto mt-16">
      <h1 className="text-2xl font-bold">Create Account</h1>
      <input name="name" type="text" placeholder="Full name" required className="border rounded px-3 py-2" />
      <input name="email" type="email" placeholder="Email" required className="border rounded px-3 py-2" />
      <input name="password" type="password" placeholder="Password" required className="border rounded px-3 py-2" />
      <button type="submit" disabled={loading} className="bg-black text-white rounded py-2 disabled:opacity-50">
        {loading ? 'Creating...' : 'Sign Up'}
      </button>
    </form>
  )
}
