import { TBurgerState } from '@/features/burger'
import { TIngredient } from '@/shared/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'

const initialState: TBurgerState = {
  ingredients: [],
  bun: null,
}

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: (
      state,
      action: PayloadAction<{ ingredient: TIngredient }>
    ) => {
      const { ingredient } = action.payload
      const uuid = nanoid()
      if (ingredient.type === 'bun') {
        state.bun = { ...action.payload.ingredient }
      } else {
        state.ingredients.push({ ...action.payload.ingredient, uuid })
      }
    },
    removeIngredient: (state, action: PayloadAction<{ uuid: string }>) => {
      const index = state.ingredients.findIndex(
        (i) => i.uuid === action.payload.uuid
      )
      if (index !== -1) {
        state.ingredients.splice(index, 1)
      }
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ from: number; after: number }>
    ) => {
      const { from, after } = action.payload
      const ingredients = [...state.ingredients]
      const [movedItem] = ingredients.splice(from, 1)
      ingredients.splice(after, 0, movedItem)
      state.ingredients = ingredients
    },
  },
  selectors: {
    getBurgerIngredients: (state: TBurgerState): TBurgerState => {
      return state
    },
    selectBurgerPrice: (state: TBurgerState): number =>
      state.ingredients.reduce(
        (acc, item) => acc + item.price,
        state.bun ? state.bun.price * 2 : 0
      ),
  },
})

export const { addIngredient, removeIngredient, moveIngredient } =
  burgerSlice.actions

export const { getBurgerIngredients, selectBurgerPrice } = burgerSlice.selectors
