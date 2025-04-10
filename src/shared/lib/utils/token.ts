import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  TOKEN_PREFIX,
} from '@/shared/lib/constants'
import {
  getLocalData,
  removeLocalData,
  setLocalData,
} from '@/shared/lib/utils/index.ts'

interface Tokens {
  accessToken: string
  refreshToken: string
}

export const saveTokens = ({ accessToken, refreshToken }: Tokens) => {
  try {
    setLocalData(ACCESS_TOKEN_KEY, accessToken)
    setLocalData(REFRESH_TOKEN_KEY, refreshToken)
  } catch (error) {
    console.error('Ошибка сохранения токенов:', error)
  }
}

export const getAccessToken = (): string | null => {
  const token = getLocalData(ACCESS_TOKEN_KEY)
  return typeof token === 'string' ? token : null
}

export const getPureAccessToken = (): string | undefined => {
  const token = getAccessToken()
  return token?.startsWith(TOKEN_PREFIX)
    ? token.replace(TOKEN_PREFIX, '')
    : token || undefined
}
export const getRefreshToken = (): string | null => {
  const token = getLocalData(REFRESH_TOKEN_KEY)
  return typeof token === 'string' ? token : null
}

export const clearTokens = () => {
  try {
    removeLocalData(ACCESS_TOKEN_KEY)
    removeLocalData(REFRESH_TOKEN_KEY)
  } catch (error) {
    console.error('Ошибка удаления токенов:', error)
  }
}
