import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'

export const getProfileOrdersState = (state: RootState) => state.profileOrders

export const getProfileOrders = createSelector(
  getProfileOrdersState,
  (state) => state.orders
)

export const getOrderNumbersDone = createSelector(getProfileOrders, (orders) =>
  orders.filter((o) => o.status === 'done').map((o) => o.number)
)

export const getOrderNumbersInWork = createSelector(
  getProfileOrders,
  (orders) => orders.filter((o) => o.status !== 'done').map((o) => o.number)
)

export const getProfileOrdersStats = createSelector(
  getProfileOrdersState,
  (state) => ({
    total: state.total,
    totalToday: state.totalToday,
  })
)
