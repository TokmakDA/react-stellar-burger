import { clearTokens } from '@/features/auth/lib'
import { refreshAccessToken } from '@/shared/api/refresh-token.ts'
import { IFetchQueryErrorResponse } from '@/shared/types'
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { API_BASE_URL } from '@/shared/config'

// Базовый `fetchBaseQuery`
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('accessToken')

    if (token) {
      headers.set('Authorization', token)
    }
    return headers
  },
})

// Функция с обновлением токена
export const baseQueryWithRauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError | IFetchQueryErrorResponse
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (
    result.error &&
    result.error.status === 403 &&
    (result.error as IFetchQueryErrorResponse)?.data?.message === 'jwt expired'
  ) {
    console.log('jwt expired', result.error)

    try {
      await refreshAccessToken()
      result = await baseQuery(args, api, extraOptions)
    } catch (e) {
      console.error(e)
      clearTokens()
    }
  }

  return result
}
