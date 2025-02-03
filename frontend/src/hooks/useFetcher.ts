import { useAuth0 } from '@auth0/auth0-react'
import { useCallback } from 'react'
import { backendInstance } from '../axios'

export const useFetcher = () => {
  const { getAccessTokenSilently } = useAuth0()

  const fetcher = useCallback(
    async (url: string) => {
      const token = await getAccessTokenSilently()

      return backendInstance
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data)
    },
    [getAccessTokenSilently]
  )

  return fetcher
}
