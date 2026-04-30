import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const infoApi = createApi({
  reducerPath: 'infoApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
  }),

  tagTypes: ['Users', 'Posts'],

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ['Users'],
    }),

    getUser: builder.query({
      query: (id: string) => `/users/${id}`,
    }),

    addUser: builder.mutation({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,
   }),
   invalidatesTags: ['Users'],
  }),

  updateUser: builder.mutation({
  query: ({ id, ...data }) => ({
    url: `users/${id}`,
    method: 'PATCH',
    body: data,
  }),
  invalidatesTags: ['Users'],
  }),


   deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),

    getPosts: builder.query({
      query: () => '/posts',
      providesTags: ['Posts'],
    }),

    addPost: builder.mutation({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Posts'],
    }),

    updatePost: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/posts/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Posts'],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
    }),

    

  }),
})

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetPostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,

} = infoApi