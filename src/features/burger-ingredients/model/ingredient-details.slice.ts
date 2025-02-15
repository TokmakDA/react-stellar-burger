import { TBurgerIngredient } from '@/shared/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState: TBurgerIngredient | null = null

export const ingredientDetailsSlice = createSlice({
  name: 'burgerIngredient',
  initialState,
  reducers: {
    setIngredient: (_, action) => {
      const { ingredient } = action.payload
      return ingredient
    },
    removeIngredient: () => {
      return null
    },
  },
  selectors: {
    getIngredient: (state) => state,
  },
  extraReducers: () => {},
})

export const { setIngredient, removeIngredient } =
  ingredientDetailsSlice.actions
export default ingredientDetailsSlice.reducer
