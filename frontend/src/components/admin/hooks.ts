import useSWR from 'swr'

import { useFetcher } from '../../hooks/useFetcher'

import { Ticket, User } from './types'

export const useUsers = (shouldFetch: boolean | undefined) => {
  const fetcher = useFetcher()

  return useSWR<User[]>(shouldFetch ? [`/users`] : null, fetcher)
}

export const useTickets = () => {
  const fetcher = useFetcher()

  return useSWR<Ticket[]>([`/tickets`], fetcher)
}

export const useUserTickets = (id: number) => {
  const fetcher = useFetcher()

  return useSWR<Ticket[]>([`/tickets/${id}`], fetcher)
}
