import { createSlice } from '@reduxjs/toolkit'
import { int_2_roman, roman_2_int } from '../../utils/converter'

export const convertSlice = createSlice({
  name: 'convert',
  initialState: {
    value: '',
  },
  reducers: {
    romanToDecimal: (state, action) => {
      state.value = roman_2_int(action.payload)
    },
    decimalToRoman: (state, action) => {
      state.value = int_2_roman(action.payload)
    },
    reset: (state, action) => {
      state.value = ''
    }
  },
})

export const { romanToDecimal, decimalToRoman, reset } = convertSlice.actions

export default convertSlice.reducer