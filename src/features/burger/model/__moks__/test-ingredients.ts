import type { TIngredient } from '@/shared/types'

export const mockIngredient = {
  _id: '643d69a5c3f7b9001cfa094a',
  name: 'Сыр с астероидной плесенью',
  type: 'main',
  proteins: 84,
  fat: 48,
  carbohydrates: 420,
  calories: 3377,
  price: 4142,
  image: 'https://code.s3.yandex.net/react/code/cheese.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
  __v: 0,
} as TIngredient

export const mockBun = {
  ...mockIngredient,
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
} as TIngredient
