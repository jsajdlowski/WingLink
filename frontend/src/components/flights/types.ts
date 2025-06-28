export interface Airport {
  id: number
  code: string
  name: string
  country: string
  city: string
  latitude: number
  longitude: number
}

export interface Ticket {
  id: number
}

export interface Flight {
  id: number
  flightNumber: string
  origin: Airport
  destination: Airport
  departureTime: Date
  arrivalTime: Date
  airline: string
  airlineLogo: string
  price: number
}

export interface Trip {
  id: number
  origin: Airport
  destination: Airport
  departureTime: Date
  arrivalTime: Date
  price: number
  flights: Flight[]
}

export interface Destination {
  image: string
  name: string
  text: string
  airport: string
}

export interface FlightFilters {
  maxDuration: number | null
  departureTimeRange: [number, number] | null
  arrivalTimeRange: [number, number] | null
  maxTransfers: number | null
  priceRange: [number | null, number | null]
}
