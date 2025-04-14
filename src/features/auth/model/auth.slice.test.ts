import { describe, it, expect, vi, type Mock } from 'vitest'
import { authSlice, initialState, loginSuccess, logout } from './auth.slice'
import { getAccessToken } from '@/shared/lib/utils/token'

vi.mock('@/shared/lib/utils/token', () => ({
  getAccessToken: vi.fn(),
}))

describe('authSlice', () => {
  const reducer = authSlice.reducer

  it('should return isAuthenticated = false by default', () => {
    const state = reducer(undefined, { type: '' })
    expect(state).toEqual(initialState)
    expect(state.isAuthenticated).toBe(false)
  })

  it('should set isAuthenticated = true on loginSuccess', () => {
    ;(getAccessToken as Mock).mockReturnValue('fake-token')
    const state = reducer({ isAuthenticated: false }, loginSuccess())
    expect(state.isAuthenticated).toBe(true)
  })

  it('should set isAuthenticated = false on logout', () => {
    const state = reducer({ isAuthenticated: true }, logout())
    expect(state.isAuthenticated).toBe(false)
  })

  it('isAuthenticated selector should return the correct value', () => {
    const selector = authSlice.selectors.isAuthenticated
    const mockState = {
      auth: {
        isAuthenticated: true,
      },
    }
    expect(selector(mockState)).toBe(true)
  })
})
