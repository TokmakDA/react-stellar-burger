import {
  TBurgerState,
  TBurgerIngredient,
} from '@/features/burger/model/types.ts'
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
      if (ingredient.type === 'bun') {
        state.bun = { ...action.payload.ingredient }
      } else {
        state.ingredients.push({ ...action.payload.ingredient, uuid: nanoid() })
      }
    },
    removeIngredient: (state, action: PayloadAction<{ uuid: string }>) => {
      console.log(action.payload)
      const index = state.ingredients.findIndex(
        (i) => i.uuid === action.payload.uuid
      )
      if (index !== -1) {
        state.ingredients.splice(index, 1)
      }
    },
    setBurgerIngredients: (
      state,
      action: PayloadAction<TBurgerIngredient[]>
    ) => {
      state.ingredients = action.payload
    },
    sorTConstructorIngredients: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload
      const ingredients = [...state.ingredients]
      // const temp = ingredients[from]
      // ingredients[from] = ingredients[to]
      // ingredients[to] = temp
      ingredients.splice(to, 1, ingredients.slice(from, 1)[0])
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

export const { addIngredient, removeIngredient } = burgerSlice.actions

export const { getBurgerIngredients, selectBurgerPrice } = burgerSlice.selectors
