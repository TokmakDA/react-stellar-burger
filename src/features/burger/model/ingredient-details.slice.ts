import { TIngredient } from '@/shared/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState: TIngredient | null = null

export const ingredientDetailsSlice = createSlice({
  name: 'burgerIngredient',
  initialState,
  reducers: {
    setIngredientDetails: (_, action) => {
      const { ingredient } = action.payload
      return ingredient
    },
    removeIngredientDetails: () => {
      return null
    },
  },
  selectors: {
    getIngredient: (state) => state,
  },
  extraReducers: () => {},
})

export const { setIngredientDetails, removeIngredientDetails } =
  ingredientDetailsSlice.actions
export default ingredientDetailsSlice.reducer
