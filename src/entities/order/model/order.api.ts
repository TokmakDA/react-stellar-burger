import { baseQueryWithRauth } from '@/shared/api'
import { API_ENDPOINTS } from '@/shared/config/api.ts'
import { TOrder } from '@/shared/types'
import { createApi } from '@reduxjs/toolkit/query/react'

export const orderApi = createApi({
  reducerPath: 'order',
  baseQuery: baseQueryWithRauth,
  endpoints: (builder) => ({
    createOrder: builder.mutation<
      { name: string; order: { number: number }; success: boolean },
      { ingredients: string[] }
    >({
      query: (body) => ({
        url: API_ENDPOINTS.ORDERS,
        method: 'POST',
        body,
      }),
    }),

    getOrder: builder.query<TOrder, number>({
      query(id) {
        return {
          url: API_ENDPOINTS.ORDERS + `/${id}`,
          method: 'GET',
        }
      },
      transformResponse: (response: { orders: TOrder[]; success: boolean }) => {
        if (!response.orders?.length) {
          throw new Error('Order not found')
        }
        return response.orders[0]
      },
    }),
  }),
})

export const { useCreateOrderMutation, useLazyGetOrderQuery } = orderApi
