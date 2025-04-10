import { useLocation } from 'react-router'

export const useBackgroundLocation = () => {
  const location = useLocation()

  const background = location.state?.background || null
  const from = location.state?.from || null
  const isBackground = Boolean(background)
  const state = { background, from }

  return {
    location,
    background,
    from,
    isBackground,
    state,
  }
}
