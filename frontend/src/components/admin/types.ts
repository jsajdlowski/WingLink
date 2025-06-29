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
  firstName: string
  lastName: string
  seatClass: SeatClass
  flightTrip: Trip
}

export enum SeatClass {
  ECONOMY = 'ECONOMY',
  PREMIUM_ECONOMY = 'PREMIUM_ECONOMY',
  BUSINESS = 'BUSINESS',
  FIRST_CLASS = 'FIRST_CLASS',
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

export interface User {
  id: number
  auth0Id: string
  firstName: string
  lastName: string
  email: string
  role: string | null
  tickets: Ticket[]
}
