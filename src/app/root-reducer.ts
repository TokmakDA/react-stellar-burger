import { orderApi } from '@/entities/order'
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
  orderApi
)
