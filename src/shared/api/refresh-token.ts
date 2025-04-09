import { IRefreshTokenResponse } from '@/features/auth'
import { API_BASE_URL, API_ENDPOINTS } from '@/shared/config'
import { clearTokens, getRefreshToken, saveTokens } from '@/features/auth/lib'

export const refreshAccessToken = async (): Promise<IRefreshTokenResponse> => {
  const refreshToken = getRefreshToken()

  if (!refreshToken) {
    clearTokens()
    throw new Error('No refresh token')
  }

  const response = await fetch(
    `${API_BASE_URL}${API_ENDPOINTS.REFRESH_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: refreshToken }),
    }
  )

  if (!response.ok) {
    clearTokens()
    throw new Error('Failed to refresh token')
  }

  const data = (await response.json()) as IRefreshTokenResponse

  saveTokens(data)

  return data
}
