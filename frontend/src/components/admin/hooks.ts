import useSWR from 'swr'

import { useFetcher } from '../../hooks/useFetcher'

import { Ticket, User } from './types'
import { useAuth0 } from '@auth0/auth0-react'
import { useCallback } from 'react'
import { backendInstance } from '../../axios'

export const useUsers = (shouldFetch: boolean | undefined) => {
  const fetcher = useFetcher()

  return useSWR<User[]>(shouldFetch ? [`/users`] : null, fetcher)
}

export const useTickets = () => {
  const fetcher = useFetcher()

  return useSWR<Ticket[]>([`/tickets`], fetcher)
}

export const useUserTickets = (
  id: number,
  shouldFetch: boolean | undefined
) => {
  const fetcher = useFetcher()

  return useSWR<Ticket[]>(shouldFetch ? [`/tickets/${id}`] : null, fetcher)
}

export const useDeleteTicket = () => {
  const { getAccessTokenSilently } = useAuth0()

  const deleteTicket = useCallback(
    async (id: number) => {
      const token = await getAccessTokenSilently()

      return backendInstance.delete(`/tickets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    [getAccessTokenSilently]
  )

  return deleteTicket
}
