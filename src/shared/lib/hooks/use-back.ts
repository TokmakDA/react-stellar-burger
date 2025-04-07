import { useNavigate, useLocation } from 'react-router'

export const useBack = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from

  const goBack = () => {
    navigate(from || -1, { replace: true })
  }

  return { goBack, from }
}
