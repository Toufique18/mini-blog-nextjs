import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const infoApi = createApi({
  reducerPath: 'infoApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
    }),

    getUser: builder.query({
      query: (id: string) => `/users/${id}`,
    }),
  }),
})

export const {
  useGetUsersQuery,
  useGetUserQuery,
} = infoApi