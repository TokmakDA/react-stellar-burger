import {
  ingredientDetailsSlice,
  initialState,
  setIngredientDetails,
} from '@/entities/ingredient'
import { testIngredient } from '@/entities/ingredient/model/__mocks__/test-ingredient.ts'
import { describe, it, expect } from 'vitest'

describe('ingredientDetailsSlice', () => {
  it('should return the initial state by default', () => {
    const result = ingredientDetailsSlice.reducer(undefined, { type: '' })
    expect(result).toEqual(initialState)
  })

  it('should handle setIngredient', () => {
    const result = ingredientDetailsSlice.reducer(
      initialState,
      setIngredientDetails(testIngredient)
    )
    expect(result).toEqual(testIngredient)
    expect(result).not.toEqual(initialState)
  })

  it('should handle setIngredientDetails with null', () => {
    const result = ingredientDetailsSlice.reducer(
      initialState,
      setIngredientDetails(null)
    )
    expect(result).toEqual(null)
    expect(result).not.toEqual(testIngredient)
  })
})
