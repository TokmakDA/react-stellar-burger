import { orderFeedActions } from '@/features/order-feed/model/ws.actions.ts'
import { WebsocketStatus } from '@/shared/lib/ws'
import { TOrdersResponse } from '@/shared/types'
import { createSlice } from '@reduxjs/toolkit'

export type TOrderFeedState = TOrdersResponse & {
  status: WebsocketStatus
  error: string | null
}

export const initialState: TOrderFeedState = {
  status: WebsocketStatus.OFFLINE,
  error: null,
  orders: [],
  success: false,
  total: 0,
  totalToday: 0,
}

export const orderFeedSlice = createSlice({
  name: 'orderFeed',
  initialState,
  reducers: {},
  selectors: {
    getStatus: (state) => state.status,
    getOrderFeed: (state) => state.orders,
    getError: (state) => state.error,
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderFeedActions.onConnecting, (state) => {
        state.status = WebsocketStatus.CONNECTING
      })
      .addCase(orderFeedActions.onOpen, (state) => {
        state.status = WebsocketStatus.ONLINE
      })
      .addCase(orderFeedActions.onClose, (state) => {
        state.status = WebsocketStatus.OFFLINE
      })
      .addCase(orderFeedActions.onError, (state, action) => {
        state.error = action.payload
      })
      .addCase(orderFeedActions.onMessage, (state, action) => {
        const { orders, success, totalToday, total } = action.payload
        state.orders = orders
        state.total = total
        state.totalToday = totalToday
        state.success = success
      })
  },
})
//
// export const {} = profileOrdersSlice.actions
//
export const { getStatus, getOrderFeed, getError } = orderFeedSlice.selectors
