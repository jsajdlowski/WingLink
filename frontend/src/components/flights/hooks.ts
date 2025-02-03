import useSWR from 'swr'

import { useFetcher } from '../../hooks/useFetcher'
import { Flight } from './types'

export const useFlights = () => {
  const fetcher = useFetcher()

  return useSWR<Flight[]>('/flights', fetcher)
}
