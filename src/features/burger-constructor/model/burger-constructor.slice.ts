import { TBurgerIngredient } from '@/shared/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'

type TIngredient = TBurgerIngredient & {
  uuid: string
}

type TBurgerConstructorState = {
  ingredients: TIngredient[]
  bun: null | TIngredient
}

const initialState: TBurgerConstructorState = {
  ingredients: [],
  bun: null,
}

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (
      state,
      action: PayloadAction<{ ingredient: TBurgerIngredient }>
    ) => {
      state.ingredients.push({ ...action.payload.ingredient, uuid: nanoid() })
    },
    removeIngredient: (state, action: PayloadAction<{ uuid: string }>) => {
      const index = state.ingredients.findIndex(
        (i) => i.uuid === action.payload.uuid
      )
      if (index !== -1) {
        state.ingredients.splice(index, 1)
      }
    },
    setBurgerIngredients: (state, action: PayloadAction<TIngredient[]>) => {
      state.ingredients = action.payload
    },
    sortIngredients: (
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
    getBurgerIngredients: (state: TBurgerConstructorState): TIngredient[] => {
      return state.ingredients
    },
    selectBurgerPrice: (state: TBurgerConstructorState): number =>
      state.ingredients.reduce((acc, item) => acc + item.price, 0) +
      (state.bun ? state.bun.price * 2 : 0),
  },
})

export const { addIngredient, removeIngredient } =
  burgerConstructorSlice.actions

export const { getBurgerIngredients, selectBurgerPrice } =
  burgerConstructorSlice.selectors
