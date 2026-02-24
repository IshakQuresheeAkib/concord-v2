'use client'

import { useQuery } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'
import type { Biodata } from '@/types/biodata'
import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure'

const useUserBiodata = (): readonly [Biodata | undefined, () => Promise<void>, boolean] => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data, refetch: _refetch, isLoading } = useQuery<AxiosResponse<Biodata>>({
    queryKey: ['userBiodata', user?.email, user],
    enabled: !!user?.email,
    queryFn: () => axiosSecure.get<Biodata>(`/biodatas/${user!.email}`),
  })

  const refetch = async (): Promise<void> => { await _refetch() }
  return [data?.data, refetch, isLoading] as const
}

export default useUserBiodata
