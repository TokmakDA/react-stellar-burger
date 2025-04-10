export const ROUTES = {
  HOME: '/',
  NOT_FOUND: '*',
  INGREDIENT_DETAILS: '/ingredients/:id',

  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  PROFILE: '/profile',
  PROFILE_ORDERS: '/profile/orders',
  PROFILE_ORDER_DETAILS: '/profile/orders/:orderNum',

  ORDER_FEED: '/feed',
  ORDER_FEED_DETAILS: '/feed/:orderNum',
} as const
