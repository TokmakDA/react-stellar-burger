import { API_BASE_URL } from '@/shared/config/config.ts'
import { TIngredient } from '@/shared/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface GetIngredientsResponse {
  success: boolean
  data: TIngredient[]
}

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (builder) => ({
    // GET /ingredients
    getIngredients: builder.query<GetIngredientsResponse, void>({
      query: () => ({ url: '/ingredients' }),
    }),
  }),
})

export const { useGetIngredientsQuery } = ingredientsApi
