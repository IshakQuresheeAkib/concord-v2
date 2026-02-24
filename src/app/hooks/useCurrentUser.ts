'use client'

import { useSession, signOut as nextAuthSignOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

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

/**
 * Custom hook to get current user session
 * Replaces useAuth() from React version
 */
export function useCurrentUser(): UseCurrentUserReturn {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const logOut = async (): Promise<void> => {
    try {
      // Sign out from NextAuth
      await nextAuthSignOut({ redirect: false })
      
      // Optional: Call your backend logout endpoint
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        method: 'POST',
        credentials: 'include'
      })
      
      // Redirect to home
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