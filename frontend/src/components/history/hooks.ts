import useSWR from 'swr'
import { useFetcher } from '../../hooks/useFetcher'
import { Ticket } from './types'

export const useMyTickets = () => {
  const fetcher = useFetcher()

  return useSWR<Ticket[]>('http://localhost:8080/api/tickets/my', fetcher)
}
