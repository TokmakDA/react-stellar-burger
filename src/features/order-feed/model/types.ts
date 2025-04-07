import { TIngredient } from '@/shared/types'

export type TBurgerIngredient = TIngredient & {
  uuid: string
}

export type TBurgerState = {
  ingredients: TBurgerIngredient[]
  bun: null | TBurgerIngredient
}
