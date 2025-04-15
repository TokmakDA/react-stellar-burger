import {
  handleAuthSuccess,
  handleLogoutSuccess,
  loginSuccess,
  logout,
} from '@/features/auth'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { saveTokens, clearTokens } from '@/shared/lib/utils'

vi.mock('@/shared/lib/utils', () => ({
  saveTokens: vi.fn(),
  clearTokens: vi.fn(),
  getLocalData: vi.fn(),
}))

vi.mock('@/entities/user', () => ({
  userApi: {
    util: {
      resetApiState: vi.fn(() => ({ type: 'userApi/reset' })),
    },
  },
}))

describe('authApi login/register success handler', () => {
  const dispatch = vi.fn()

  afterEach(() => {
    vi.restoreAllMocks()
    dispatch.mockClear()
  })

  it('should call saveTokens and dispatch loginSuccess', async () => {
    const mockData = {
      accessToken: 'mock-accessToken',
      refreshToken: 'mock-refreshToken',
      success: true,
      user: { email: 'test@test.com', name: '123' },
    }

    await handleAuthSuccess(
      { email: 'test@test.com', password: '123' },
      {
        dispatch,
        queryFulfilled: Promise.resolve({ data: mockData }),
      }
    )

    expect(saveTokens).toHaveBeenCalledWith(mockData)
    expect(dispatch).toHaveBeenCalledWith(loginSuccess())
  })

  it('should call clearTokens and dispatch logout + resetApiState', async () => {
    const mockResponse = { success: true, message: 'Successful logout' }

    await handleLogoutSuccess(undefined, {
      dispatch,
      queryFulfilled: Promise.resolve({ data: mockResponse }),
    })

    expect(clearTokens).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(logout())
    expect(dispatch).toHaveBeenCalledWith({ type: 'userApi/reset' })
  })

  it('should not throw if logout query fails', async () => {
    const error = new Error('Logout failed')

    await expect(
      handleLogoutSuccess(undefined, {
        dispatch,
        queryFulfilled: Promise.reject(error),
      })
    ).resolves.not.toThrow()

    expect(dispatch).not.toHaveBeenCalledWith(logout())
  })
})
