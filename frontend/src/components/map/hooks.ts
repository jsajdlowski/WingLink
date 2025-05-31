import useSWR from 'swr'
import { useEffect } from 'react' // Import useEffect
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
    // If SWR fetched new data, dispatch it to the store.
    if (data) {
      // console.log('Dispatching setAirports due to data change:', data); // For debugging
      dispatch(setAirports({ airports: data }))
    }
  }, [data, dispatch]) // Dependencies: dispatch only when data or dispatch function changes

  // console.log('useFetchAirports hook called', { data, error, isLoading, isValidating }); // For debugging

  return { data, error, isLoading, isValidating } // Return the full SWR response
}
