import useSWR from 'swr'

import { User } from './types'
import { useFetcher } from '../../hooks/useFetcher'

export const useMe = () => {
  const fetcher = useFetcher()

  return useSWR<User>('/users/me', fetcher)
}

export const useUsers = () => {
  const fetcher = useFetcher()

  return useSWR<User[]>('/users', fetcher)
}
