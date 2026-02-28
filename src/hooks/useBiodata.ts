'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import type { AxiosResponse } from 'axios'
import type { Biodata } from '@/types/biodata'
import { useCurrentUser } from './useCurrentUser'
import useAxiosSecure from './useAxiosSecure'

const useBiodata = (): readonly [Biodata | undefined, () => Promise<void>, boolean] => {
  const { user } = useCurrentUser()
  const params = useParams<{ id: string }>()
  const id = params?.id
  const axiosSecure = useAxiosSecure()

  const { data, refetch: _refetch, isLoading } = useQuery<AxiosResponse<Biodata>>({
    queryKey: ['biodata', id, user],
    enabled: !!id,
    queryFn: () => axiosSecure.get<Biodata>(`/biodata-details/${id}`),
  })

  const refetch = async (): Promise<void> => { await _refetch() }
  return [data?.data, refetch, isLoading] as const
}

export default useBiodata
