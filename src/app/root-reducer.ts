import { burgerConstructorSlice } from '@/features/burger-constructor'
import {
  burgerIngredientsApi,
  ingredientDetailsSlice,
} from '@/features/burger-ingredients'
import { combineSlices } from '@reduxjs/toolkit'

export const rootReducer = combineSlices(
  burgerIngredientsApi,
  ingredientDetailsSlice,
  burgerConstructorSlice
)
