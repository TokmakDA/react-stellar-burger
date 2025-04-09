import { ingredientDetailsSlice, ingredientsApi } from '@/entities/ingredient'
import { orderAcceptedApi } from '@/entities/order-accepted'
import { userApi } from '@/entities/user'
import { authApi, authSlice } from '@/features/auth'
import { burgerSlice } from '@/features/burger'
import { orderFeedSlice } from '@/features/order-feed'
import { combineSlices } from '@reduxjs/toolkit'

export const rootReducer = combineSlices(
  ingredientsApi,
  ingredientDetailsSlice,
  burgerSlice,
  orderAcceptedApi,
  authApi,
  authSlice,
  userApi,
  orderFeedSlice
)
