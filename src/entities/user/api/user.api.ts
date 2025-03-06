import { baseQueryWithRauth } from '@/shared/api'
import { API_ENDPOINTS } from '@/shared/config'
import { createApi } from '@reduxjs/toolkit/query/react'
import { TUser } from '../model'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithRauth,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUser: builder.query<TUser, void>({
      query() {
        return {
          url: API_ENDPOINTS.USER,
        }
      },
      transformResponse: (response: { user: TUser }) => response.user,
      providesTags: ['User'],
    }),

    updateUser: builder.mutation<TUser, Partial<TUser>>({
      query: (data) => ({
        url: API_ENDPOINTS.USER,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response: { user: TUser }) => response.user,
      invalidatesTags: ['User'],
    }),
  }),
})

export const { useGetUserQuery, useUpdateUserMutation } = userApi
