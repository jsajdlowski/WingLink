import useSWR from 'swr'
import { useEffect } from 'react'
import { Airport } from '../flights/types.ts'
import { usePublicFetcher } from '../../hooks/usePublicFetcher'
import { useAppDispatch } from '../../hooks/storeHooks.ts'
import { setAirports } from '../../store/airportsSlice.ts'

export const useFetchAirports = () => {
  const dispatch = useAppDispatch()
  const fetcher = usePublicFetcher()

  const { data, error, isLoading, isValidating } = useSWR<Airport[]>(
    '/airports',
    fetcher
  )

  useEffect(() => {
    if (data) {
      dispatch(setAirports({ airports: data }))
    }
  }, [data, dispatch])

  return { data, error, isLoading, isValidating }
}
