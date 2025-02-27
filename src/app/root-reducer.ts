import { orderApi } from '@/entities/order'
import { userApi } from '@/entities/user'
import { authApi, authSlice } from '@/features/auth'
import {
  burgerSlice,
  ingredientDetailsSlice,
  ingredientsApi,
} from '@/features/burger'
import { combineSlices } from '@reduxjs/toolkit'

export const rootReducer = combineSlices(
  ingredientsApi,
  ingredientDetailsSlice,
  burgerSlice,
  orderApi,
  authApi,
  authSlice,
  userApi
)
