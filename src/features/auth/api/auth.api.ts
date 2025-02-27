import { userApi } from '@/entities/user'
import {
  IAuthResponse,
  IForgotPasswordRequest,
  ILoginRequest,
  ILogoutResponse,
  IRegisterRequest,
  IResetPasswordRequest,
} from '@/features/auth'
import { API_BASE_URL, API_ENDPOINTS } from '@/shared/config'
import { IDefaultResponse } from '@/shared/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (builder) => ({
    register: builder.mutation<IAuthResponse, IRegisterRequest>({
      query(data) {
        return {
          url: API_ENDPOINTS.REGISTER,
          method: 'POST',
          body: data,
        }
      },
    }),
    login: builder.mutation<IAuthResponse, ILoginRequest>({
      query(data) {
        return {
          url: API_ENDPOINTS.LOGIN,
          method: 'POST',
          body: data,
          credentials: 'include',
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          await dispatch(userApi.endpoints.getUser.initiate(null))
        } catch (error) {
          console.log(error)
        }
      },
    }),
    logout: builder.mutation<IDefaultResponse, ILogoutResponse>({
      query({ token }) {
        return {
          url: API_ENDPOINTS.LOGOUT,
          method: 'POST',
          body: { token },
          credentials: 'include',
        }
      },
    }),

    forgotPassword: builder.mutation<IDefaultResponse, IForgotPasswordRequest>({
      query: ({ email }) => ({
        url: API_ENDPOINTS.PASSWORD_RESET,
        method: 'POST',
        body: { email },
      }),
    }),

    resetPassword: builder.mutation<IDefaultResponse, IResetPasswordRequest>({
      query: ({ password, token }) => ({
        url: API_ENDPOINTS.PASSWORD_RESET_CONFIRM,
        method: 'POST',
        body: { password, token },
      }),
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
