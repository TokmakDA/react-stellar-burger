import { API_BASE_URL, API_ENDPOINTS } from '@/shared/config'
import { TIngredient } from '@/shared/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface GetIngredientsResponse {
  success: boolean
  data: TIngredient[]
}

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getIngredients: builder.query<GetIngredientsResponse, void>({
      query: () => ({ url: API_ENDPOINTS.INGREDIENTS }),
    }),
    getIngredient: builder.query<
      { success: boolean; data: TIngredient },
      string
    >({
      query: (id: string) => ({
        url: `${API_ENDPOINTS.INGREDIENTS}/${id}`,
      }),
    }),
  }),
})

export const { useGetIngredientsQuery, useGetIngredientQuery } = feedApi
