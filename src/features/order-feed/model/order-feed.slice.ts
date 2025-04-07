import { TFeedResponse } from '@/features/order-feed/model/types.ts'
import {
  onClose,
  onConnecting,
  onError,
  onMessage,
  onOpen,
} from '@/features/order-feed/model/ws.actions.ts'
import { WebsocketStatus } from '@/shared/lib/ws'
import { createSlice } from '@reduxjs/toolkit'

export type TOrderFeedState = TFeedResponse & {
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
      .addCase(onConnecting, (state) => {
        state.status = WebsocketStatus.CONNECTING
      })
      .addCase(onOpen, (state) => {
        state.status = WebsocketStatus.ONLINE
      })
      .addCase(onClose, (state) => {
        state.status = WebsocketStatus.OFFLINE
      })
      .addCase(onError, (state, action) => {
        state.error = action.payload
      })
      .addCase(onMessage, (state, action) => {
        const { orders, success, totalToday, total } = action.payload
        state.orders = orders
        state.total = total
        state.totalToday = totalToday
        state.success = success
      })
  },
})
//
// export const {} = orderFeedSlice.actions
//
export const { getStatus, getOrderFeed, getError } = orderFeedSlice.selectors
