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
  destination: string | undefined,
  origin: string | undefined,
  departureDate: Date | undefined
) => {
  const fetcher = useFetcher()

  return useSWR<Flight[]>(
    [`/flights/search`, { destination, origin, departureDate }],
    fetcher
  )
}
