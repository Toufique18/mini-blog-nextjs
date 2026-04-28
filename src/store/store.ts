import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import { apiSlice } from './apiSlice'
import infoReducer from './infoSlice' // 👈 correct import

export const store = configureStore({
  reducer: {
    user: userReducer,
    info: infoReducer, // ✅ correct
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})