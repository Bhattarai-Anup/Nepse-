import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './reducerSlices/counterSlice'

export default configureStore({
  reducer: {
    counter:counterSlice,
  },
})