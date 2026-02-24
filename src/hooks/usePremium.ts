'use client'

import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth'
import useAxiosPublic from './useAxiosPublic'

const usePremium = (): readonly [boolean, boolean] => {
  const { user } = useAuth()
  const axiosPublic = useAxiosPublic()

  const { data: isPremium = false, isPending: premiumPending } = useQuery<boolean>({
    queryKey: [user?.email, 'isPremium', user],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get<{ premium: boolean }>(`/users/premium/${user!.email}`)
      return res.data.premium
    },
  })

  return [isPremium, premiumPending] as const
}

export default usePremium
