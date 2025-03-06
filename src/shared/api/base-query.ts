import { IRefreshTokenResponse } from '@/features/auth'
import { clearTokens, saveTokens } from '@/features/auth/lib'
import { IFetchQueryErrorResponse } from '@/shared/types'
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { API_BASE_URL, API_ENDPOINTS } from '@/shared/config'

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

const handleLogout = () => {
  clearTokens()
}

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
    const refreshToken = localStorage.getItem('refreshToken')

    if (!refreshToken) {
      handleLogout()
      return result
    }

    const refreshResult = await baseQuery(
      {
        url: API_ENDPOINTS.REFRESH_TOKEN,
        method: 'POST',
        body: { token: refreshToken },
      },
      api,
      extraOptions
    )

    if (refreshResult.data) {
      const { accessToken, refreshToken } =
        refreshResult.data as IRefreshTokenResponse

      saveTokens({ accessToken, refreshToken })
      result = await baseQuery(args, api, extraOptions)
    } else {
      handleLogout()
    }
  }

  return result
}
