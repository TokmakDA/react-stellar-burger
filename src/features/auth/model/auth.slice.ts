import { createSlice } from '@reduxjs/toolkit'
import { getAccessToken } from '@/features/auth/lib/token.ts'

interface AuthState {
  isAuthenticated: boolean
}

const initialState: AuthState = {
  isAuthenticated: Boolean(getAccessToken()),
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
