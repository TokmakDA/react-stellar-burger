import { burgerIngredientsApi } from '@/features/burger-ingredients'
import { combineSlices } from '@reduxjs/toolkit'

export const rootReducer = combineSlices(burgerIngredientsApi)
