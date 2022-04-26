import { configureStore } from '@reduxjs/toolkit'
import convertReducer from './slices/convertSlice';

export default configureStore({
  reducer: {
    convert: convertReducer,
  },
})