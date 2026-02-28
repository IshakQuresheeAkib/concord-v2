'use client'

import { FirebaseError } from 'firebase/app'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, type FormEvent, type JSX, type ChangeEvent } from 'react'
import { toast } from 'sonner'
import { FcGoogle } from 'react-icons/fc'
import { MdOutlineAlternateEmail, MdOutlineLink } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import Heading from '@/components/ui/Shared/Heading/Heading'
import InputField from '@/components/ui/Shared/InputField/InputField'
import { registerUser } from '@/lib/authService'

const validatePassword = (password: string): boolean => {
  if (!/(?=.*[!#$%&?^*@~() "])/.test(password)) {
    toast.error('Password should have a special character!')
    return false
  }
  if (!/[A-Z]/.test(password)) {
    toast.error('Password should have a capital letter!')
    return false
  }
  if (!/(?=.{8,})/.test(password)) {
    toast.error('Password should have minimum eight characters!')
    return false
  }
  return true
}

export default function SignupPage(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [imageName, setImageName] = useState<string>('')
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const router = useRouter()

  const handleRegister = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value
    const imageFiles = (form.elements.namedItem('imageURL') as HTMLInputElement).files

    if (!validatePassword(password)) return
    if (!imageFiles?.[0]) {
      toast.error('Please upload a profile image!')
      return
    }

    setIsLoading(true)

    try {
      const { idToken, name: displayName, email: userEmail, image, isNewUser } = await registerUser({
        name,
        email,
        password,
        imageFile: imageFiles[0],
      })

      const result = await signIn('credentials', {
        idToken,
        name: displayName,
        email: userEmail,
        image,
        redirect: false,
      })

      if (!result?.ok) {
        toast.error('Account created but auto-login failed. Please log in.')
        router.push('/login')
        return
      }

      form.reset()
      setImageName('')

      if (isNewUser) {
        toast.success('Account created successfully!')
      } else {
        toast.error('User already exists!')
      }
      router.push('/')
    } catch (error: unknown) {
      const fbError = error instanceof FirebaseError ? error : null
      if (fbError?.code === 'auth/email-already-in-use') {
        toast.error('User email already exists!')
      } else if (fbError?.code === 'auth/weak-password') {
        toast.error('Password is too weak!')
      } else if (fbError?.code === 'auth/invalid-email') {
        toast.error('Invalid email address!')
      } else {
        toast.error('Signup failed. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogle = (): void => {
    signIn('google', { callbackUrl: '/' })
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    if (file) setImageName(file.name)
  }

  return (
    <div className="min-h-screen flex justify-center items-center mx-3" data-aos="fade-bottom">
      <div className="w-full xl:p-10 p-5 rounded-lg shadow-lg overflow-hidden border my-5 border-black/5 max-w-sm md:max-w-lg">
        <Heading>Get started today!</Heading>
        <p className="text-sm text-center mt-5">
          Log in to your account to access your personalized dashboard, view your saved cars, and continue your car-buying journey.
        </p>

        <button
          type="button"
          onClick={handleGoogle}
          className="flex w-72 mx-auto items-center justify-center my-6 border border-black/10 rounded-lg shadow-sm hover:bg-surface active:scale-95 duration-500 cursor-pointer"
        >
          <FcGoogle className="text-2xl" />
          <span className="px-4 py-3 w-5/6 text-center text-gray-600 font-medium">
            Sign up with Google
          </span>
        </button>

        <div className="my-5 flex items-center justify-between">
          <span className="border-b border-black/10 w-1/5 md:w-1/3" />
          <span className="text-xs text-center text-black/50">or register with email</span>
          <span className="border-b border-black/10 w-1/5 md:w-1/3" />
        </div>

        <form onSubmit={handleRegister}>
          <div className="my-5">
            <InputField
              name="name"
              type="text"
              label="Name"
              required
              endAdornment={<CgProfile className="text-lg text-gray-400 pointer-events-none" />}
            />
          </div>

          <InputField
            name="email"
            type="email"
            label="Email"
            required
            endAdornment={<MdOutlineAlternateEmail className="text-lg text-gray-400 pointer-events-none" />}
          />

          <div className="my-5">
            <InputField
              name="password"
              type={isVisible ? 'text' : 'password'}
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

          <label className="w-40 text-center block">
            <div className="w-40 text-center bg-surface rounded-lg p-3 cursor-pointer focus-within:ring-2 focus-within:ring-teal/40">
              <FaCloudUploadAlt className="text-xl text-black/80 mx-auto" />
              <span className="text-sm text-black/30 normal-case font-normal">Upload An Image *</span>
            </div>
            <input
              type="file"
              accept="image/*"
              required
              name="imageURL"
              onChange={handleFileChange}
              className="w-0 h-0 overflow-hidden absolute"
            />
          </label>

          {imageName && (
            <div className="flex items-center text-teal gap-1 mt-2 mb-2">
              <MdOutlineLink className="text-xl shrink-0" />
              <span className="text-sm truncate">
                {imageName.length > 35 ? `${imageName.slice(0, 35)}.jpg` : imageName}
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 mt-5 bg-light-teal hover:bg-teal text-white text-base font-semibold rounded-lg transition-colors duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating account…' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-5 text-sm font-light">
          Already have an Account? Please{' '}
          <Link href="/login" className="underline underline-offset-4 text-teal font-medium">
            Log in!
          </Link>
        </p>
      </div>
    </div>
  )
}
