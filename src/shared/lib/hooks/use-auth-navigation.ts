import { ROUTES } from '@/shared/config'
import { useNavigate, useLocation } from 'react-router'

export const useAuthNavigation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { LOGIN, REGISTER, RESET_PASSWORD, FORGOT_PASSWORD } = ROUTES

  const background = location.state?.background || null
  const from = location.state?.from || null

  const state = {
    background,
    from,
  }

  const goToLogin = () => navigate(LOGIN, { state })
  const goToRegister = () => navigate(REGISTER, { state })
  const goToForgotPassword = () => navigate(FORGOT_PASSWORD, { state })
  const goToResetPassword = () => navigate(RESET_PASSWORD, { state })
  const goToHome = () =>
    navigate(location.state?.from || -1, { replace: true, state })

  return {
    goToLogin,
    goToRegister,
    goToForgotPassword,
    goToResetPassword,
    goToHome,
    state,
  }
}
