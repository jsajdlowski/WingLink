import { useCallback } from 'react'
import { backendInstance } from '../axios'

export const usePublicFetcher = () => {
  return useCallback(async (data: [string, object] | string) => {
    let url: string
    let params = {}
    if (typeof data === 'string') {
      url = data
    } else {
      url = data[0]
      params = data[1]
    }
    return backendInstance.get(url, { params }).then((res) => res.data)
  }, [])
}
