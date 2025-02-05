import { useAuth0 } from '@auth0/auth0-react'
import { useCallback } from 'react'
import { backendInstance } from '../axios'

export const useFetcher = () => {
  const { getAccessTokenSilently } = useAuth0()

  const fetcher = useCallback(
    async (data: [string, object] | string) => {
      let url: string
      let params = {}
      if (typeof data === 'string') {
        url = data
      } else {
        url = data[0]
        params = data[1]
      }
      const token = await getAccessTokenSilently()
      return backendInstance
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params,
        })
        .then((res) => res.data)
    },
    [getAccessTokenSilently]
  )

  return fetcher
}
