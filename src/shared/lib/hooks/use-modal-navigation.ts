import { useLocation, useNavigate, NavigateOptions } from 'react-router'

type ModalNavigateOptions = Omit<NavigateOptions, 'state'> & {
  state?: Record<string, unknown>
}

export const useModalNavigation = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const navigateWithBackground = (
    path: string,
    options: ModalNavigateOptions = {}
  ) => {
    const { state, ...rest } = options

    navigate(path, {
      ...rest,
      state: {
        ...state,
        background: location,
      },
    })
  }

  const navigateWithFrom = (
    path: string,
    options: ModalNavigateOptions = {}
  ) => {
    const { state, ...rest } = options

    navigate(path, {
      ...rest,
      state: {
        ...state,
        from: location,
        background: location,
      },
    })
  }

  return { navigateWithBackground, navigateWithFrom }
}
