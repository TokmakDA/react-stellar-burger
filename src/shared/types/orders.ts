export enum OrderStatus {
  created = 'created',
  pending = 'pending',
  done = 'done',
}
export type TOrder = {
  createdAt: string
  ingredients: string[]
  name: string
  number: number
  status: keyof typeof OrderStatus
  updatedAt: string
  _id: string
}

export type TOrdersResponse = {
  success: boolean
  total?: number
  totalToday?: number
  orders: TOrder[]
}
