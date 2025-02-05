import useSWR from 'swr'

import { useFetcher } from '../../hooks/useFetcher'
import { Flight } from './types'

export const useFlights = () => {
  const fetcher = useFetcher()

  return useSWR<Flight[]>('/flights', fetcher)
}

export const useFlightsSearch = (
  destination: string | undefined,
  origin: string | undefined
) => {
  const fetcher = useFetcher()

  console.log('DUpa')

  return useSWR<Flight[]>([`/flights/search`, { destination, origin }], fetcher)
}
