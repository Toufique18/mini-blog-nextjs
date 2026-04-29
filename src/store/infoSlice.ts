import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const infoApi = createApi({
  reducerPath: 'infoApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
  }),

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
    }),

    getUser: builder.query({
      query: (id: string) => `/users/${id}`,
    }),

   deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),

  }),
})

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useDeleteUserMutation,
} = infoApi