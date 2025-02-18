import { TBurgerIngredient, TBurgerState } from '@/features/burger'
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
    addIngredient: {
      reducer: (state, action: PayloadAction<TBurgerIngredient>) => {
        const { payload } = action
        if (payload.type === 'bun') {
          state.bun = payload
        } else {
          state.ingredients.push(payload)
        }
      },
      prepare: (ingredient: TIngredient) => {
        const uuid = nanoid()
        return { payload: { ...ingredient, uuid } }
      },
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
    cleanBurger: () => {
      return initialState
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

export const { addIngredient, removeIngredient, moveIngredient, cleanBurger } =
  burgerSlice.actions

export const { getBurgerIngredients, selectBurgerPrice } = burgerSlice.selectors
