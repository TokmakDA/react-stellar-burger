import { describe, it, expect } from 'vitest'
import {
  profileOrdersSlice,
  initialState,
  getOrders,
  getProfileOrderStatus,
  getProfileOrderError,
} from './profile-orders.slice'
import { profileOrderActions } from './ws.actions'
import { WebsocketStatus } from '@/shared/lib/ws'
import type { TOrder } from '@/shared/types'

const reducer = profileOrdersSlice.reducer

describe('profileOrdersSlice', () => {
  it('should return initial state by default', () => {
    const state = reducer(undefined, { type: '' })
    expect(state).toEqual(initialState)
  })

  it('should handle onConnecting', () => {
    const state = reducer(initialState, profileOrderActions.onConnecting())
    expect(state.status).toBe(WebsocketStatus.CONNECTING)
  })

  it('should handle onOpen', () => {
    const state = reducer(initialState, profileOrderActions.onOpen())
    expect(state.status).toBe(WebsocketStatus.ONLINE)
  })

  it('should handle onClose', () => {
    const state = reducer(
      { ...initialState, status: WebsocketStatus.ONLINE },
      profileOrderActions.onClose()
    )
    expect(state.status).toBe(WebsocketStatus.OFFLINE)
  })

  it('should handle onError', () => {
    const error = 'WebSocket error'
    const state = reducer(initialState, profileOrderActions.onError(error))
    expect(state.error).toBe(error)
  })

  it('should handle onMessage and update orders', () => {
    const orders: TOrder[] = [
      {
        _id: 'order1',
        ingredients: ['id1', 'id2'],
        name: 'Test Order',
        status: 'done',
        createdAt: '',
        updatedAt: '',
        number: 123,
      },
    ]
    const state = reducer(
      initialState,
      profileOrderActions.onMessage({ orders, success: true })
    )
    expect(state.orders).toEqual(orders)
    expect(state.success).toBe(true)
  })

  it('getProfileOrders selector returns correct orders', () => {
    const mockOrders: TOrder[] = [
      {
        _id: 'test',
        ingredients: ['1', '2'],
        name: 'Order',
        status: 'pending',
        createdAt: '',
        updatedAt: '',
        number: 1,
      },
    ]
    const state = { profileOrders: { ...initialState, orders: mockOrders } }
    expect(getOrders(state)).toEqual(mockOrders)
  })

  it('getProfileStatus selector returns current status', () => {
    const state = {
      profileOrders: { ...initialState, status: WebsocketStatus.ONLINE },
    }
    expect(getProfileOrderStatus(state)).toBe(WebsocketStatus.ONLINE)
  })

  it('getProfileError selector returns current error', () => {
    const state = { profileOrders: { ...initialState, error: 'oops error' } }
    expect(getProfileOrderError(state)).toBe('oops error')
  })
})
