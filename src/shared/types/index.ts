export type { TIngredient } from './ingredient'

export interface IDefaultResponse {
  success: boolean
  message?: string
}

export interface IFetchQueryErrorResponse {
  data: IDefaultResponse
}
