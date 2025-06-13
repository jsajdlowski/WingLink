import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from './store'

interface FlightsState {
  flights: Flight[]
  returnFlights: Flight[]
  loading: boolean
  error: string | null
}

const initialState: FlightsState = {
  flights: [],
  returnFlights: [],
  loading: false,
  error: null,
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

const flightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    setFlights: (state, action: PayloadAction<Flight[]>) => {
      state.flights = action.payload
    },
    setReturnFlights: (state, action: PayloadAction<Flight[]>) => {
      state.returnFlights = action.payload
    },
    // setFlightById: (state, action: PayloadAction<Flight>) => {
    //   state.flightById[action.payload.id] = action.payload
    // },
    // setSearchResults: (state, action: PayloadAction<Flight[]>) => {
    //   state.searchResults = action.payload
    // },
    clearSearchResults: (state) => {
      state.returnFlights = []
      state.flights = []
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const {
  setFlights,
  //   setFlightById,
  //   setSearchResults,
  //   clearSearchResults,
  setLoading,
  setError,
} = flightsSlice.actions

export const selectFlights = (state: RootState) => state.flights

export default flightsSlice.reducer
