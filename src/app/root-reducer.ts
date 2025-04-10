import { ingredientDetailsSlice, ingredientsApi } from '@/entities/ingredient'
import { orderApi } from '@/entities/order'
import { userApi } from '@/entities/user'
import { authApi, authSlice } from '@/features/auth'
import { burgerSlice } from '@/features/burger'
import { orderFeedSlice } from '@/features/order-feed'
import { profileOrdersSlice } from '@/features/profile'
import { combineSlices } from '@reduxjs/toolkit'

export const rootReducer = combineSlices(
  ingredientsApi,
  ingredientDetailsSlice,
  burgerSlice,
  orderApi,
  authApi,
  authSlice,
  userApi,
  orderFeedSlice,
  profileOrdersSlice
)
