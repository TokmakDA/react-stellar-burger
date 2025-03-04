import { baseQueryWithRauth } from '@/shared/api'
import { API_ENDPOINTS } from '@/shared/config/api'
import { createApi } from '@reduxjs/toolkit/query/react'

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: baseQueryWithRauth,
  endpoints: (builder) => ({
    createOrder: builder.mutation<
      { name: string; order: { number: number }; success: boolean }, // пример ответа
      { ingredients: string[] } // аргумент
    >({
      query: (body) => ({
        url: API_ENDPOINTS.ORDERS,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useCreateOrderMutation } = orderApi
