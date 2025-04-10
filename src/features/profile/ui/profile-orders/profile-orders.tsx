import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { OrderCard } from '@/entities/order'
import {
  getProfileOrderError,
  getOrders,
  getProfileOrderStatus,
  profileOrderActions,
} from '@/features/profile/model'
import { ROUTES, WS_ENDPOINTS } from '@/shared/config'
import { useModalNavigation } from '@/shared/lib/hooks'
import { buildPath, getPureAccessToken } from '@/shared/lib/utils'
import { WebsocketStatus } from '@/shared/lib/ws'
import { scrollSectionStyles } from '@/shared/styles/layouts'
import { Loader, StatePage } from '@/shared/ui'
import { useCallback, useEffect, useMemo } from 'react'
import styles from './profile-orders.module.scss'

const ProfileOrders = () => {
  const dispatch = useAppDispatch()

  const status = useAppSelector(getProfileOrderStatus)
  const error = useAppSelector(getProfileOrderError)
  const orders = useAppSelector(getOrders)

  const sortedOrders = useMemo(() => {
    return orders
      ? [...orders].sort((a, b) => {
          const dateA = new Date(a.createdAt)
          const dateB = new Date(b.createdAt)
          return dateB.getTime() - dateA.getTime()
        })
      : []
  }, [orders])

  const { navigateWithBackground } = useModalNavigation()

  const isDisconnected = useMemo(
    () => status !== WebsocketStatus.ONLINE,
    [status]
  )

  const isLoading = useMemo(
    () => status === WebsocketStatus.CONNECTING,
    [status]
  )

  const connectSocket = useCallback(
    () =>
      dispatch(
        profileOrderActions.connect({
          url: WS_ENDPOINTS.ORDERS,
          token: getPureAccessToken(),
        })
      ),
    [dispatch]
  )

  const handleCardClick = useCallback(
    (orderNum: string) => {
      navigateWithBackground(
        buildPath(ROUTES.PROFILE_ORDER_DETAILS, { orderNum })
      )
    },
    [navigateWithBackground]
  )

  useEffect(() => {
    if (isDisconnected) connectSocket()
  }, [connectSocket, isDisconnected])

  if (error) {
    return <StatePage type='error' />
  }
  if (isLoading) {
    return <Loader />
  }

  return (
    <section
      aria-label='История заказов'
      className={`${styles.section} ${scrollSectionStyles['scroll-section']}`}
    >
      <div
        className={`${styles.section__wrapper} ${scrollSectionStyles['scroll-section__scroll-wrapper']}`}
      >
        <ul
          className={`${styles['section__list-container']} ${scrollSectionStyles['scroll-section__container']}`}
        >
          {sortedOrders.map((item) => (
            <li key={item._id}>
              <OrderCard order={item} onClick={handleCardClick} isShowStatus />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ProfileOrders
