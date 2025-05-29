import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from './store'

interface SelectedCountryState {
  selectedCountry: string;
}

const initialState: SelectedCountryState = {
  selectedCountry: '',
}

const selectedCountrySlice = createSlice({
  name: 'selectedCountry',
  initialState,
  reducers: {
    setSelectedCountry: (
      state,
      action: PayloadAction<{ selectedCountry: string }>,
    ) => {
      state.selectedCountry = action.payload.selectedCountry;
    },

    resetSelectedCountry: () => initialState,
  },
})

export const {setSelectedCountry, resetSelectedCountry} = selectedCountrySlice.actions

export const getSelectedCountry = (state: RootState) => state.selectedCountry;
export default selectedCountrySlice.reducer
