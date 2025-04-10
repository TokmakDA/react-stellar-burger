export type { TIngredient } from './ingredient'
export * from './orders.ts'

export interface IDefaultResponse {
  success: boolean
  message?: string
}

export interface IFetchQueryErrorResponse {
  data: IDefaultResponse
}
