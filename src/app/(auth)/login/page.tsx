'use client'

import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense, useState, type FormEvent, type JSX } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { toast } from 'sonner'
import InputField from '@/components/ui/Shared/InputField/InputField'

function LoginForm(): JSX.Element {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/'
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setIsLoading(true)
    const form = e.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value

    const result = await signIn('credentials', { email, password, redirect: false })
    setIsLoading(false)

    if (result?.ok) {
      toast.success('Logged in successfully!')
      router.push(callbackUrl)
      form.reset()
    } else {
      toast.error(result?.error ?? 'Login failed. Please try again.')
    }
  }

  const handleGoogle = (): void => {
    signIn('google', { callbackUrl })
  }

  return (
    <div className="min-h-screen flex justify-center items-center mx-3">
      <div className="w-full xl:p-10 p-5 rounded-lg shadow-lg overflow-hidden border 2xl:my-0 my-5 border-black/5 max-w-sm md:max-w-lg">
        <h2 className="text-2xl font-bold text-center text-teal">Welcome Back!</h2>
        <p className="text-sm text-center mt-2 text-gray-500">
          Log in to your account to access your personalized dashboard and continue your journey.
        </p>

        <button
          type="button"
          onClick={handleGoogle}
          className="flex w-72 mx-auto items-center justify-center my-6 border border-black/10 rounded-lg shadow-sm hover:bg-surface active:scale-95 duration-300 cursor-pointer"
        >
          <FcGoogle className="text-2xl" />
          <span className="px-4 py-3 w-5/6 text-center text-gray-600 font-medium">Sign in with Google</span>
        </button>

        <div className="my-5 flex items-center justify-between">
          <span className="border-b border-black/10 w-1/5 md:w-1/3" />
          <span className="text-xs text-center text-black/50">or login with email</span>
          <span className="border-b border-black/10 w-1/5 md:w-1/3" />
        </div>

        <form onSubmit={handleLogin}>
          <InputField
            type="email"
            name="email"
            label="Email"
            required
            endAdornment={<MdOutlineAlternateEmail className="text-lg text-gray-400 pointer-events-none" />}
          />

          <div className="my-6">
            <InputField
              type={isVisible ? 'text' : 'password'}
              name="password"
              label="Password"
              required
              endAdornment={
                <button
                  type="button"
                  className="text-lg text-gray-400 cursor-pointer"
                  onClick={() => setIsVisible(v => !v)}
                  aria-label={isVisible ? 'Hide password' : 'Show password'}
                >
                  {isVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              }
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 mt-2 bg-light-teal hover:bg-teal text-white text-base font-semibold rounded-lg transition-colors duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in…' : 'Log in'}
          </button>
        </form>

        <p className="mt-5 text-sm font-light">
          {"Don't have an account? "}
          <Link href="/signup" className="underline underline-offset-4 text-teal font-medium">
            Sign up!
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage(): JSX.Element {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <span className="size-10 animate-spin rounded-full border-4 border-light-teal border-t-transparent" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}