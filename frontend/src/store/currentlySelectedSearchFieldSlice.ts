import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from './store'

export enum SearchFormFields {
  FROM = 'from',
  TO = 'to',
}

interface SelectedFieldState {
  selectedField: SearchFormFields
}

const initialState: SelectedFieldState = {
  selectedField: SearchFormFields.FROM,
}

const selectedFieldSlice = createSlice({
  name: 'selectedField',
  initialState,
  reducers: {
    setSelectedField: (
      state,
      action: PayloadAction<{ selectedField: SearchFormFields }>
    ) => {
      state.selectedField = action.payload.selectedField;
    },

    resetSelectedField: () => initialState,
  },
})

export const {setSelectedField, resetSelectedField} = selectedFieldSlice.actions

export const getSelectedField = (state: RootState) => state.selectedField;
export default selectedFieldSlice.reducer
