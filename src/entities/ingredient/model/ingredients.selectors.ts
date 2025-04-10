import { ingredientsApi } from '@/entities/ingredient'
import { TIngredient } from '@/shared/types'
import { createSelector } from '@reduxjs/toolkit'

const selectIngredientsResult = ingredientsApi.endpoints.getIngredients.select()

export const selectIngredientsData = createSelector(
  selectIngredientsResult,
  (
    result
  ): {
    ingredients: TIngredient[]
    isLoading: boolean
    isError: boolean
  } => ({
    ingredients: result?.data?.data || [],
    isLoading: result?.status === 'pending',
    isError: Boolean(result?.error),
  })
)

export const selectIngredientsMap = createSelector(
  selectIngredientsData,
  ({ ingredients }) => new Map(ingredients.map((i) => [i._id, i]))
)
