import useSWR from 'swr'
import { useFetcher } from '../../hooks/useFetcher'
import { Ticket } from './types'
import { useCallback } from 'react'
import { backendInstance } from '../../axios'
import { useAuth0 } from '@auth0/auth0-react'

export const useMyTickets = () => {
  const fetcher = useFetcher()

  return useSWR<Ticket[]>('http://localhost:8080/api/tickets/my', fetcher)
}

export type CreateTicket = Omit<Ticket, 'id' | 'flight'> & {
  flightId: number
}

export const useBuyTicket = () => {
  const { getAccessTokenSilently } = useAuth0()

  const buyTicket = useCallback(
    async (data: CreateTicket) => {
      const token = await getAccessTokenSilently()

      return backendInstance.post('/tickets', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    [getAccessTokenSilently]
  )

  return buyTicket
}
