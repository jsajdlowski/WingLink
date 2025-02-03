export interface Airport {
  id: number
  code: string
  name: string
  country: string
  city: string
}

export interface Ticket {
  id: number
}

export interface Flight {
  id: number
  airline: string
  arrivalTime: Date
  departureTime: Date
  destination: Airport
  flightNumber: string
  origin: Airport
  price: number
  tickets: Ticket[]
}
