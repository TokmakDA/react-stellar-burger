export const API_BASE_URL =
  import.meta.env.REACT_APP_API_BASE_URL ||
  'https://norma.nomoreparties.space/api'

export const API_ENDPOINTS = {
  PASSWORD_RESET: '/password-reset',
  PASSWORD_RESET_CONFIRM: '/password-reset/reset',
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/token',
  USER: '/auth/user',
  INGREDIENTS: '/ingredients',
  ORDERS: '/orders',
}

export const WS_API_BASE_URL =
  import.meta.env.REACT_WS_API_BASE_URL || 'wss://norma.nomoreparties.space'

export const WS_ENDPOINTS = {
  ORDERS: '/orders/all',
}
