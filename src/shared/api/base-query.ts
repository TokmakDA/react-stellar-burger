import { IRefreshTokenResponse } from '@/features/auth'
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
  BaseQueryApi,
} from '@reduxjs/toolkit/query/react'
import { API_BASE_URL, API_ENDPOINTS } from '@/shared/config'
import { userApi } from '@/entities/user'

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

const handleLogout = (api: BaseQueryApi) => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  api.dispatch(userApi.util.resetApiState())
}

// Функция с обновлением токена
export const baseQueryWithRauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken')

    if (!refreshToken) {
      handleLogout(api)
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
      const { accessToken, refreshToken: newRefreshToken } =
        refreshResult.data as IRefreshTokenResponse

      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', newRefreshToken)

      result = await baseQuery(args, api, extraOptions)
    } else {
      handleLogout(api)
    }
  }

  return result
}
