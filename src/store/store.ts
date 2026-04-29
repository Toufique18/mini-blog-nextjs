import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import { apiSlice } from './apiSlice'
import { infoApi } from './infoSlice'


export const store = configureStore({
  reducer: {
    user: userReducer,
    [infoApi.reducerPath]: infoApi.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      infoApi.middleware),
})