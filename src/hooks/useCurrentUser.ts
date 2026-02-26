'use client'

import { useSession, signOut as nextAuthSignOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useAxiosSecure from './useAxiosSecure'

interface CurrentUser {
  id?: string
  name?: string | null
  email?: string | null
  image?: string | null
  role?: string
}

interface UseCurrentUserReturn {
  user: CurrentUser | null
  loading: boolean
  isAuthenticated: boolean
  logOut: () => Promise<void>
}

export function useCurrentUser(): UseCurrentUserReturn {
  const { data: session, status } = useSession()
  const router = useRouter()
  const axiosSecure = useAxiosSecure()
  
  const logOut = async (): Promise<void> => {
    try {
      await nextAuthSignOut({ redirect: false })  
      await axiosSecure.post('/logout') 
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return {
    user: session?.user || null,
    loading: status === 'loading',
    isAuthenticated: status === 'authenticated',
    logOut
  }
}