import useSWR from 'swr'
import { useFetcher } from '../../hooks/useFetcher'

export const useMyTickets = () => {
  const fetcher = useFetcher()

  return useSWR<Ticket[]>('http://localhost:8080/api/tickets/my', fetcher)
}
