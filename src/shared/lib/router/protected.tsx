import { useAppSelector } from '@/app/hooks'
import { FC } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'
import { isAuthenticated } from '@/features/auth'

type TProtectedProps = {
  onlyUnAuth?: boolean
}

export const Protected: FC<TProtectedProps> = ({ onlyUnAuth = false }) => {
  const isAuth = useAppSelector(isAuthenticated)
  const location = useLocation()

  if (onlyUnAuth && isAuth) {
    const { from } = location.state ?? { from: { pathname: '/' } }
    return <Navigate to={from} replace />
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return <Outlet />
}
