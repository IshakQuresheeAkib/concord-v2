'use client'

import { useQuery } from '@tanstack/react-query'
import { useCurrentUser } from './useCurrentUser'
import { axiosSecure } from '@/lib/axios'

const useAdmin = (): readonly [boolean, boolean] => {
  const { user, loading } = useCurrentUser()

  const { data: isAdmin = false, isPending } = useQuery<boolean>({
    queryKey: [user?.email, 'isAdmin', user],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get<{ admin: boolean }>(`/users/admin/${user!.email}`)
      return res.data.admin
    },
  })

  return [isAdmin, isPending] as const
}

export default useAdmin
