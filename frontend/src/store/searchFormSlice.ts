import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

export interface SearchFormState {
  origin: string
  destination: string
  departureDate: string | null
  returnDate: string | null
  isOneWay: boolean
  numberOfPassengers: number
  isSubmitted: boolean
}

const initialState: SearchFormState = {
  origin: '',
  destination: '',
  departureDate: null,
  returnDate: null,
  isOneWay: false,
  numberOfPassengers: 1,
  isSubmitted: false,
}

const searchFormSlice = createSlice({
  name: 'searchForm',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<SearchFormState>) => {
      return { ...state, ...action.payload }
    },
    clearForm: () => initialState,
    setFormSubmitted: (state, action: PayloadAction<boolean>) => {
      console.log('cos', action.payload)

      state.isSubmitted = action.payload
    },
  },
})

export const { setFormData, clearForm, setFormSubmitted } =
  searchFormSlice.actions

export const selectSearchForm = (state: RootState) => state.searchFrom
export default searchFormSlice.reducer
