import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'

export const getOrderFeedState = (state: RootState) => state.orderFeed

export const getOrders = createSelector(
  getOrderFeedState,
  (state) => state.orders
)

export const getOrderNumbersDone = createSelector(getOrders, (orders) =>
  orders.filter((o) => o.status === 'done').map((o) => o.number)
)

export const getOrderNumbersInWork = createSelector(getOrders, (orders) =>
  orders.filter((o) => o.status !== 'done').map((o) => o.number)
)

export const getOrdersStats = createSelector(getOrderFeedState, (state) => ({
  total: state.total,
  totalToday: state.totalToday,
}))
