import { API_BASE_URL, API_ENDPOINTS } from '@/shared/config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TUser } from '../model'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUser: builder.query<TUser, null>({
      query() {
        return {
          url: API_ENDPOINTS.USER,
          credentials: 'include',
        }
      },
      transformResponse: (response: { user: TUser }) => response.user,
    }),

    updateUser: builder.mutation<TUser, Partial<TUser>>({
      query: (data) => ({
        url: API_ENDPOINTS.USER,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response: { user: TUser }) => response.user,
    }),
  }),
})

export const { useGetUserQuery, useUpdateUserMutation } = userApi
