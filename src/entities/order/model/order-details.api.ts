// features/order/model/order-details.api.ts
import { API_BASE_URL } from '@/shared/config/config.ts'
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
        url: 'orders',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useCreateOrderMutation } = orderApi
