import { createSlice } from '@reduxjs/toolkit'
import { getAccessToken } from '@/entities/user/lib/token'

interface AuthState {
  isAuthenticated: boolean
}

const initialState: AuthState = {
  isAuthenticated: !!getAccessToken(), // Загружаем токен при старте
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.isAuthenticated = false
    },
  },
  selectors: {
    isAuthenticated: (state) => state.isAuthenticated,
  },
})

export const { loginSuccess, logout } = authSlice.actions

export const { isAuthenticated } = authSlice.selectors
