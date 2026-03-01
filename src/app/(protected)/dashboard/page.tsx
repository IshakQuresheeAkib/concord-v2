import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (session?.user?.role === 'admin') redirect('/dashboard/admin')
  redirect('/dashboard/edit')
}
