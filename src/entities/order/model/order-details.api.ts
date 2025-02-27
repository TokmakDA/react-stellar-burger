import { API_BASE_URL, API_ENDPOINTS } from '@/shared/config/api'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
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
