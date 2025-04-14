import { userApi } from '@/entities/user'
import {
  IAuthResponse,
  IForgotPasswordRequest,
  ILoginRequest,
  IRegisterRequest,
  IResetPasswordRequest,
  loginSuccess,
  logout,
} from '@/features/auth'
import {
  selectForgotPassword,
  unSelectForgotPassword,
} from '@/features/auth/lib'
import { baseQueryWithRauth } from '@/shared/api'
import { API_ENDPOINTS } from '@/shared/config'
import { clearTokens, saveTokens } from '@/shared/lib/utils'

import { IDefaultResponse } from '@/shared/types'
import { createApi } from '@reduxjs/toolkit/query/react'

interface MutationLifecycleArgs<T> {
  dispatch: (action: unknown) => void
  queryFulfilled: Promise<{ data: T }>
}

export const handleAuthSuccess = async (
  _: IRegisterRequest | ILoginRequest,
  { dispatch, queryFulfilled }: MutationLifecycleArgs<IAuthResponse>
) => {
  const { data } = await queryFulfilled
  saveTokens(data)
  dispatch(loginSuccess())
}

export const handleLogoutSuccess = async (
  _: void,
  { dispatch, queryFulfilled }: MutationLifecycleArgs<IDefaultResponse>
) => {
  try {
    await queryFulfilled
    clearTokens()
    dispatch(logout())
    dispatch(userApi.util.resetApiState())
  } catch (error) {
    console.log(error)
  }
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithRauth,
  endpoints: (builder) => ({
    register: builder.mutation<IAuthResponse, IRegisterRequest>({
      query(data) {
        return {
          url: API_ENDPOINTS.REGISTER,
          method: 'POST',
          body: data,
        }
      },
      onQueryStarted: handleAuthSuccess,
    }),
    login: builder.mutation<IAuthResponse, ILoginRequest>({
      query(data) {
        return {
          url: API_ENDPOINTS.LOGIN,
          method: 'POST',
          body: data,
        }
      },
      onQueryStarted: handleAuthSuccess,
    }),
    logout: builder.mutation<IDefaultResponse, void>({
      query() {
        const token = localStorage.getItem('refreshToken')
        return {
          url: API_ENDPOINTS.LOGOUT,
          method: 'POST',
          body: { token },
        }
      },
      onQueryStarted: handleLogoutSuccess,
    }),

    forgotPassword: builder.mutation<IDefaultResponse, IForgotPasswordRequest>({
      query: ({ email }) => ({
        url: API_ENDPOINTS.PASSWORD_RESET,
        method: 'POST',
        body: { email },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled
          selectForgotPassword()
        } catch (error) {
          console.log(error)
        }
      },
    }),

    resetPassword: builder.mutation<IDefaultResponse, IResetPasswordRequest>({
      query: ({ password, token }) => ({
        url: API_ENDPOINTS.PASSWORD_RESET_CONFIRM,
        method: 'POST',
        body: { password, token },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled
          unSelectForgotPassword()
        } catch (error) {
          console.log(error)
        }
      },
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi
