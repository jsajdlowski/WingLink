import useSWR from 'swr'

import { useFetcher } from '../../hooks/useFetcher'
import { usePublicFetcher } from '../../hooks/usePublicFetcher'
import { useAuth0 } from '@auth0/auth0-react'
import { Trip } from './types'

export const useFlightsSearch = (
  shouldFetch: boolean | undefined,
  destination: string | undefined,
  origin: string | undefined,
  date: string | null
) => {
  const { isAuthenticated } = useAuth0()
  const authFetcher = useFetcher()
  const publicFetcher = usePublicFetcher()

  const fetcher = isAuthenticated ? authFetcher : publicFetcher

  return useSWR<Trip[]>(
    shouldFetch ? [`/flights/search`, { destination, origin, date }] : null,
    fetcher
  )
}
