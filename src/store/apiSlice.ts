import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
  }),

  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
    }),

    getPost: builder.query({
      query: (id: string) => `/posts/${id}`,
    }),
    
  }),
})

export const {
  useGetPostsQuery,
  useGetPostQuery,
} = apiSlice