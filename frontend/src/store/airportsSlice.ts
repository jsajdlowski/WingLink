import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import {Airport} from "../components/flights/types.ts";

interface AirportsState {
  airports: Airport[] | undefined
}

const initialState: AirportsState = {
  airports: undefined
}

const airportsSlice = createSlice({
  name: 'airports',
  initialState,
  reducers: {
    setAirports: (
      state,
      action: PayloadAction<{ airports: Airport[] }>
    ) => {
      state.airports = action.payload.airports || undefined
    },

    resetAirports: () => initialState,
  },
})

export const { setAirports, resetAirports } = airportsSlice.actions

export const selectAirports = (state: RootState) => state.airports
export default airportsSlice.reducer
