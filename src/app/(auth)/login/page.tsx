'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FormEvent, JSX, useState } from 'react'

export default function LoginPage(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })
      
      console.log('result: ', result);
      if (result?.ok) {
        router.push('/dashboard')
      } else {
        console.error('Login failed')
      }
    } catch (error) {
      console.log('error: ', error);
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleGoogleLogin = (): void => {
    signIn('google', { callbackUrl: '/dashboard' })
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <button type="button" onClick={handleGoogleLogin}>
        Google Login
      </button>
    </form>
  )
}