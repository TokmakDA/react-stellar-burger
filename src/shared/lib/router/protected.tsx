import { useAppSelector } from '@/app/hooks'
import { FC, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router'
import { isAuthenticated } from '@/features/auth'

type TProtectedProps = {
  onlyUnAuth?: boolean
  children: ReactNode
}

export const Protected: FC<TProtectedProps> = ({
  onlyUnAuth = false,
  children,
}) => {
  const isAuth = useAppSelector(isAuthenticated)
  const location = useLocation()

  if (onlyUnAuth && isAuth) {
    const { from } = location.state ?? { from: { pathname: '/' } }
    return <Navigate to={from} replace />
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return children
}

export const OnlyAuth: FC<{ children: ReactNode }> = ({ children }) => (
  <Protected>{children}</Protected>
)

export const OnlyUnAuth: FC<{ children: ReactNode }> = ({ children }) => (
  <Protected onlyUnAuth>{children}</Protected>
)
