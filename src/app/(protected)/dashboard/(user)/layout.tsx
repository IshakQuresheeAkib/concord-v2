import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { toast } from 'sonner'
import type { ReactNode } from 'react'

export default async function UserLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')
  if (session.user.role === 'admin') {
    toast.error('This is not a user account!')
    redirect('/')
  }
  return <>{children}</>
}
