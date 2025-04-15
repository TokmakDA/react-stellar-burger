import { describe, it, expect } from 'vitest'
import {
  orderFeedSlice,
  initialState,
  getStatus,
  getOrderFeed,
  getError,
} from './order-feed.slice'
import { orderFeedActions } from './ws.actions'
import { WebsocketStatus } from '@/shared/lib/ws'
import type { TOrder, TOrdersResponse } from '@/shared/types'

const reducer = orderFeedSlice.reducer

describe('orderFeedSlice', () => {
  it('should return initial state by default', () => {
    const state = reducer(undefined, { type: '' })
    expect(state).toEqual(initialState)
  })

  it('should handle onConnecting', () => {
    const state = reducer(initialState, orderFeedActions.onConnecting())
    expect(state.status).toBe(WebsocketStatus.CONNECTING)
    expect(state).toEqual({
      ...initialState,
      status: WebsocketStatus.CONNECTING,
    })
  })

  it('should handle onOpen', () => {
    const state = reducer(initialState, orderFeedActions.onOpen())
    expect(state.status).toBe(WebsocketStatus.ONLINE)
    expect(state).toEqual({
      ...initialState,
      status: WebsocketStatus.ONLINE,
    })
  })

  it('should handle onClose', () => {
    const state = reducer(
      { ...initialState, status: WebsocketStatus.ONLINE },
      orderFeedActions.onClose()
    )
    expect(state.status).toBe(WebsocketStatus.OFFLINE)
    expect(state).toEqual(initialState)
  })

  it('should handle onError', () => {
    const errorMessage = 'Connection error'
    const state = reducer(initialState, orderFeedActions.onError(errorMessage))
    expect(state.error).toBe(errorMessage)
    expect(state).toEqual({
      ...initialState,
      error: errorMessage,
    })
  })

  it('should handle onMessage and update state', () => {
    const payload: TOrdersResponse = {
      success: true,
      orders: [
        {
          _id: '67fca7dfe8e61d001cec2817',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa093d',
          ],
          status: 'done',
          name: 'Space флюоресцентный бургер',
          createdAt: '2025-04-14T06:14:55.241Z',
          updatedAt: '2025-04-14T06:14:55.919Z',
          number: 74576,
        },
        {
          _id: '67fc87c3e8e61d001cec27fe',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d',
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный био-марсианский бургер',
          createdAt: '2025-04-14T03:57:55.421Z',
          updatedAt: '2025-04-14T03:57:56.243Z',
          number: 74575,
        },
      ],
      total: 100,
      totalToday: 10,
    }

    const state = reducer(initialState, orderFeedActions.onMessage(payload))
    expect(state.success).toBe(true)
    expect(state.orders).toEqual(payload.orders)
    expect(state.total).toBe(100)
    expect(state.totalToday).toBe(10)
  })

  it('getStatus selector returns correct status', () => {
    const state = {
      orderFeed: { ...initialState, status: WebsocketStatus.ONLINE },
    }
    expect(getStatus(state)).toBe(WebsocketStatus.ONLINE)
  })

  it('getOrderFeed selector returns correct orders', () => {
    const orders = [
      {
        _id: '67fca7dfe8e61d001cec2817',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa093d',
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2025-04-14T06:14:55.241Z',
        updatedAt: '2025-04-14T06:14:55.919Z',
        number: 74576,
      } as TOrder,
    ]
    const state = { orderFeed: { ...initialState, orders } }
    expect(getOrderFeed(state)).toEqual(orders)
  })

  it('getError selector returns correct error', () => {
    const state = { orderFeed: { ...initialState, error: 'WS failed' } }
    expect(getError(state)).toBe('WS failed')
  })
})
