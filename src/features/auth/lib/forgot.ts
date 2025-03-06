import {
  getLocalData,
  removeLocalData,
  setLocalData,
} from '@/shared/lib/utils/local-storage.ts'

const FORGOT = 'forgot'

export const isForgotPassword = () => Boolean(getLocalData(FORGOT))
export const selectForgotPassword = () => setLocalData(FORGOT, true)
export const unSelectForgotPassword = () => removeLocalData(FORGOT)
