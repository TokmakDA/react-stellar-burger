import { TIngredient } from '@/shared/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = null as TIngredient | null

export const ingredientDetailsSlice = createSlice({
  name: 'burgerIngredient',
  initialState,
  reducers: (create) => ({
    setIngredientDetails: create.reducer(
      (_state, action: PayloadAction<TIngredient | null>) => action.payload
    ),
  }),

  selectors: {
    getIngredient: (state) => state,
  },
})

export const { setIngredientDetails } = ingredientDetailsSlice.actions

export const { getIngredient } = ingredientDetailsSlice.selectors
