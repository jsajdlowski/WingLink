import useSWR from 'swr'

import { axiosFetcher } from '../../axios'
import { User } from './types'

export const useUsers = () => {
  return useSWR<User[]>('/users', axiosFetcher)
}
