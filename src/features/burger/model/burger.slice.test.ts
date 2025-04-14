import {
  mockBun,
  mockIngredient,
} from '@/features/burger/model/__moks__/test-ingredients.ts'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  burgerSlice,
  addIngredient,
  removeIngredient,
  moveIngredient,
  cleanBurger,
  getBurgerIngredients,
  selectBurgerPrice,
  initialState,
} from './burger.slice'
import { TBurgerState } from '@/features/burger'

import type { TIngredient } from '@/shared/types'

describe('burgerSlice', () => {
  const reducer = burgerSlice.reducer

  const withUuid = (i: TIngredient) => addIngredient(i).payload

  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should return the initial state by default', () => {
    const result = reducer(undefined, { type: '' })
    expect(result).toEqual(initialState)
  })

  it('should add ingredient (non-bun) with uuid', () => {
    const action = addIngredient(mockIngredient)
    const state = reducer(initialState, action)

    expect(state.ingredients.length).toBe(1)
    expect(state.ingredients[0]).toMatchObject(mockIngredient)
    expect(state.ingredients[0]).toHaveProperty('uuid')
    expect(state.bun).toBeNull()
  })

  it('should replace bun when bun-type is added', () => {
    const action = addIngredient(mockBun)
    const state = reducer(initialState, action)

    expect(state.bun).toMatchObject(mockBun)
    expect(state.bun).toHaveProperty('uuid')
    expect(state.ingredients).toHaveLength(0)
  })

  it('should remove ingredient by uuid', () => {
    const first = addIngredient(mockIngredient).payload
    const second = addIngredient(mockIngredient).payload

    const state: TBurgerState = {
      bun: null,
      ingredients: [first, second],
    }

    const newState = reducer(state, removeIngredient({ uuid: first.uuid }))
    expect(newState.ingredients).toHaveLength(1)
    expect(newState.ingredients[0].uuid).toBe(second.uuid)
  })

  it('should move ingredient from one position to another', () => {
    const a = addIngredient({ ...mockIngredient, name: 'A' }).payload
    const b = addIngredient({ ...mockIngredient, name: 'B' }).payload
    const c = addIngredient({ ...mockIngredient, name: 'C' }).payload

    const initialState: TBurgerState = {
      bun: null,
      ingredients: [a, b, c],
    }

    const newState = reducer(
      initialState,
      moveIngredient({ from: 0, after: 2 })
    )
    expect(newState.ingredients.map((i) => i.name)).toEqual(['B', 'C', 'A'])
  })

  it('should clean burger state', () => {
    const state: TBurgerState = {
      bun: withUuid(mockBun),
      ingredients: [withUuid(mockIngredient)],
    }

    const newState = reducer(state, cleanBurger())
    expect(newState.bun).toBeNull()
    expect(newState.ingredients).toHaveLength(0)
  })

  it('getBurgerIngredients selector returns full state', () => {
    const state = { burger: initialState }

    expect(getBurgerIngredients(state)).toEqual(initialState)
  })

  it('selectBurgerPrice calculates total price', () => {
    const bun = { ...mockBun, price: 200 } as TIngredient
    const i1 = { ...mockIngredient, price: 50 } as TIngredient
    const i2 = { ...mockIngredient, price: 75 } as TIngredient

    const state = {
      burger: {
        bun: withUuid(bun),
        ingredients: [withUuid(i1), withUuid(i2)],
      } as TBurgerState,
    }

    const total = selectBurgerPrice(state)
    expect(total).toBe(200 * 2 + 50 + 75) // bun*2 + ingredients
  })

  it('selectBurgerPrice = 0 if no bun', () => {
    const state = {
      burger: {
        bun: null,
        ingredients: [],
      } as TBurgerState,
    }

    expect(selectBurgerPrice(state)).toBe(0)
  })

  it('should return payload with uuid', () => {
    const action = addIngredient(mockIngredient)

    expect(action).toHaveProperty('payload')
    expect(action.payload).toMatchObject(mockIngredient)
    expect(action.payload).toHaveProperty('uuid')
    expect(typeof action.payload.uuid).toBe('string')
  })
})
