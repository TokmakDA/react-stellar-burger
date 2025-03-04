import {
  IAuthResponse,
  IForgotPasswordRequest,
  ILoginRequest,
  IRegisterRequest,
  IResetPasswordRequest,
  loginSuccess,
  logout,
} from '@/features/auth'
import { baseQueryWithRauth } from '@/shared/api'
import { API_ENDPOINTS } from '@/shared/config'
import {
  clearTokens,
  saveTokens,
  unSelectForgotPassword,
} from '@/shared/lib/utils'
import { selectForgotPassword } from '@/shared/lib/utils/local-storage.ts'
import { IDefaultResponse } from '@/shared/types'
import { createApi } from '@reduxjs/toolkit/query/react'

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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          saveTokens(data)
          dispatch(loginSuccess())
        } catch (error) {
          console.log(error)
        }
      },
    }),
    login: builder.mutation<IAuthResponse, ILoginRequest>({
      query(data) {
        return {
          url: API_ENDPOINTS.LOGIN,
          method: 'POST',
          body: data,
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          saveTokens(data)
          dispatch(loginSuccess())
        } catch (error) {
          console.log(error)
        }
      },
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          clearTokens()
          dispatch(logout())
        } catch (error) {
          console.log(error)
        }
      },
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
