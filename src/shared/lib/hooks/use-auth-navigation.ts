import { ROUTES } from '@/shared/config'
import { useBackgroundLocation } from '@/shared/lib/hooks/use-background-location.ts'
import { useNavigate } from 'react-router'

export const useAuthNavigation = () => {
  const navigate = useNavigate()
  const { LOGIN, REGISTER, RESET_PASSWORD, FORGOT_PASSWORD } = ROUTES

  const { state } = useBackgroundLocation()

  const goToLogin = () => navigate(LOGIN, { state })
  const goToRegister = () => navigate(REGISTER, { state })
  const goToForgotPassword = () => navigate(FORGOT_PASSWORD, { state })
  const goToResetPassword = () => navigate(RESET_PASSWORD, { state })

  return {
    goToLogin,
    goToRegister,
    goToForgotPassword,
    goToResetPassword,
    state,
  }
}
