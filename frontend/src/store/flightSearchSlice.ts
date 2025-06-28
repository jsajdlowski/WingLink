import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

interface FlightSearchState {
  destination: string | undefined
  origin: string | undefined
}

const initialState: FlightSearchState = {
  destination: undefined,
  origin: undefined,
}

const flightSearchSlice = createSlice({
  name: 'flightSearch',
  initialState,
  reducers: {
    setSearch: (
      state,
      action: PayloadAction<{ destination?: string; origin?: string }>
    ) => {
      const { destination, origin } = action.payload
      if (destination !== undefined) {
        state.destination = destination || undefined
      }

      if (origin !== undefined) {
        state.origin = origin || undefined
      }
    },

    resetSearch: () => initialState,
  },
})

export const { setSearch, resetSearch } = flightSearchSlice.actions

export const selectSearch = (state: RootState) => state.flightSearch
export default flightSearchSlice.reducer
