'use client'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'
import { JSX, ReactNode } from 'react'
import { SnackbarProvider } from 'notistack'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Create QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
})

interface SessionProviderProps {
  children: ReactNode
}

export default function SessionProvider({ children }: SessionProviderProps): JSX.Element {
  // Initialize AOS (same as your AuthProvider)
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 50,
    })
    
    AOS.refresh()
  }, [])

  return (
    <NextAuthSessionProvider>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider 
          autoHideDuration={2000} 
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
          style={{ fontWeight: '600', fontSize: '16px' }}
          preventDuplicate
        >
          {children}
        </SnackbarProvider>
      </QueryClientProvider>
    </NextAuthSessionProvider>
  )
}