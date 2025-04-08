import { ingredientsApi } from '@/entities/ingredient'
import { createSelector } from '@reduxjs/toolkit'

const selectIngredientsResult = ingredientsApi.endpoints.getIngredients.select()

export const selectIngredientsData = createSelector(
  selectIngredientsResult,
  (ingredientsResult) => ({
    ingredients: ingredientsResult?.data?.data || [],
    isLoading: ingredientsResult?.status === 'pending',
    isError: Boolean(ingredientsResult?.error),
  })
)
