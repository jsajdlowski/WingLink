import useSWR from 'swr'

import { useFetcher } from '../../hooks/useFetcher'
import { Flight } from './types'

export const useFlight = (id: number) => {
  const fetcher = useFetcher()

  return useSWR<Flight>(`/flights/${id}`, fetcher)
}

export const useFlights = () => {
  const fetcher = useFetcher()

  return useSWR<Flight[]>('/flights', fetcher)
}

export const useFlightsSearch = (
  shouldFetch: boolean | undefined,
  destination: string | undefined,
  origin: string | undefined,
  date: string | null
) => {
  const fetcher = useFetcher()

  return useSWR<Flight[]>(
    shouldFetch ? [`/flights/search`, { destination, origin, date }] : null,
    fetcher
  )
}
