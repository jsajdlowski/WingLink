import { Trip, FlightFilters } from './types'
import { dayjs } from '../../i18n/dayjs-config'

export const applyFlightFilters = (
  flights: Trip[],
  filters: FlightFilters
): Trip[] => {
  if (flights.length === 0) return flights

  return flights.filter((flight) => {
    const departure = dayjs(flight.departureTime)
    const arrival = dayjs(flight.arrivalTime)
    const durationHours = arrival.diff(departure, 'hour', true)

    if (filters.maxDuration && durationHours > filters.maxDuration) {
      return false
    }

    if (filters.departureTimeRange) {
      const departureHour = departure.hour()
      const [startHour, endHour] = filters.departureTimeRange
      if (departureHour < startHour || departureHour > endHour) {
        return false
      }
    }

    if (filters.arrivalTimeRange) {
      const arrivalHour = arrival.hour()
      const [startHour, endHour] = filters.arrivalTimeRange
      if (arrivalHour < startHour || arrivalHour > endHour) {
        return false
      }
    }

    const transfersCount = flight.flights.length - 1
    if (
      filters.maxTransfers !== null &&
      transfersCount > filters.maxTransfers
    ) {
      return false
    }

    const [minPrice, maxPrice] = filters.priceRange
    if (minPrice !== null && flight.price < minPrice) {
      return false
    }
    if (maxPrice !== null && flight.price > maxPrice) {
      return false
    }

    return true
  })
}

export const getDefaultFilters = (): FlightFilters => ({
  maxDuration: null,
  departureTimeRange: null,
  arrivalTimeRange: null,
  maxTransfers: null,
  priceRange: [null, null],
})

export const getFlightStats = (flights: Trip[]) => {
  if (flights.length === 0) {
    return {
      minPrice: 0,
      maxPrice: 0,
      minDurationHours: 0,
      maxDurationHours: 0,
      hasDirectFlights: false,
      maxTransfers: 0,
    }
  }

  const prices = flights.map((f) => f.price)
  const durations = flights.map((f) => {
    const departure = dayjs(f.departureTime)
    const arrival = dayjs(f.arrivalTime)
    return arrival.diff(departure, 'hour', true)
  })
  const transferCounts = flights.map((f) => f.flights.length - 1)

  return {
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
    minDurationHours: Math.min(...durations),
    maxDurationHours: Math.max(...durations),
    hasDirectFlights: transferCounts.includes(0),
    maxTransfers: Math.max(...transferCounts),
  }
}
