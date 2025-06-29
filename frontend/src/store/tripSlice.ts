import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

export interface Airport {
  id: number
  code: string
  name: string
  country: string
  city: string
  latitude: number
  longitude: number
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

interface TripState {
  departureFlight: Trip | null
  returnFlight: Trip | null
}

const initialState: TripState = {
  departureFlight: null,
  returnFlight: null,
}

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    setDepartureFlight(state, action: PayloadAction<Trip>) {
      state.departureFlight = action.payload
    },
    setReturnFlight(state, action: PayloadAction<Trip>) {
      state.returnFlight = action.payload
    },
    clearTrip: () => initialState,
  },
})

export const { setDepartureFlight, setReturnFlight, clearTrip } =
  tripSlice.actions
export const selectTrip = (state: RootState) => state.trip
export default tripSlice.reducer
