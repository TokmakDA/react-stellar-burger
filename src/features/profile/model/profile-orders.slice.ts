import { profileOrderActions } from '@/features/profile/model/ws.actions.ts'
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

export const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  selectors: {
    getProfileOrderStatus: (state) => state.status,
    getOrders: (state) => state.orders,
    getProfileOrderError: (state) => state.error,
  },
  extraReducers: (builder) => {
    builder
      .addCase(profileOrderActions.onConnecting, (state) => {
        state.status = WebsocketStatus.CONNECTING
      })
      .addCase(profileOrderActions.onOpen, (state) => {
        state.status = WebsocketStatus.ONLINE
      })
      .addCase(profileOrderActions.onClose, (state) => {
        state.status = WebsocketStatus.OFFLINE
      })
      .addCase(profileOrderActions.onError, (state, action) => {
        state.error = action.payload
      })
      .addCase(profileOrderActions.onMessage, (state, action) => {
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
export const { getProfileOrderStatus, getOrders, getProfileOrderError } =
  profileOrdersSlice.selectors
