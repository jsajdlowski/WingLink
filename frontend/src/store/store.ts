import { configureStore } from '@reduxjs/toolkit'
import flightSearchReducer from './flightSearchSlice'
import airportsReducer from './airportsSlice'
import selectedFieldReducer from './currentlySelectedSearchFieldSlice'
import selectedCountryReducer from './selectedCountrySlice'

export const store = configureStore({
  reducer: {
    flightSearch: flightSearchReducer,
    airports: airportsReducer,
    selectedField: selectedFieldReducer,
    selectedCountry: selectedCountryReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
