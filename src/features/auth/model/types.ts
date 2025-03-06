import { IDefaultResponse } from '@/shared/types'

export interface IAuthResponse extends IDefaultResponse {
  accessToken: string
  refreshToken: string
  user: {
    email: string
    name: string
  }
}

export interface IRegisterRequest {
  email: string
  password: string
  name: string
}

export interface ILoginRequest {
  email: string
  password: string
}

export interface IRefreshTokenResponse extends IDefaultResponse {
  accessToken: string
  refreshToken: string
}

export interface ILogoutResponse {
  token: string
}

export interface IForgotPasswordRequest {
  email: string
}

export interface IResetPasswordRequest {
  password: string
  token: string
}
