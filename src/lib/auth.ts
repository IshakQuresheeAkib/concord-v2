import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

/**
 * Get current user session on server
 * Use in Server Components and Server Actions
 */
export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  return session?.user || null
}

/**
 * Require authentication on server
 * Redirects to /login if not authenticated
 */
export async function requireAuth() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/login')
  }
  
  return session.user
}

/**
 * Require admin role on server
 * Redirects to / if not admin
 */
export async function requireAdmin() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/login')
  }
  
  if (session.user.role !== 'admin') {
    redirect('/')
  }
  
  return session.user
}

/**
 * Check if user is admin
 */
export async function isAdmin(): Promise<boolean> {
  const session = await getServerSession(authOptions)
  return session?.user?.role === 'admin'
}