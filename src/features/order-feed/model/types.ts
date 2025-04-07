export type TOrder = {
  createdAt: string
  ingredients: string[]
  name: string
  number: number
  status: 'done'
  updatedAt: string
  _id: string
}

export enum OrderStatus {
  created = 'created',
  pending = 'pending',
  done = 'done',
}

export type TFeedResponse = {
  success: boolean
  total?: number
  totalToday?: number
  orders: TOrder[]
}

