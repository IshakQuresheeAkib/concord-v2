import { requireAuth } from '@/lib/auth'
import type { ReactNode } from 'react'

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  await requireAuth()
  return <>{children}</>
}
