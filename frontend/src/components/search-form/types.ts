export interface Form {
  departureDate: Date | null
  returnDate: Date | null
  destination: string
  origin: string
  isOneWay: boolean
  numberOfPassengers: number
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
}

export interface Airport {
  id: number
  code: string
  name: string
  country: string
  city: string
  latitude: number
  longitude: number
}
