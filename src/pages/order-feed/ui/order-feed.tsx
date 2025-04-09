import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  getStatus,
  Orders,
  Stats,
  connect,
  getError,
} from '@/features/order-feed'
import { WS_ENDPOINTS } from '@/shared/config'
import { WebsocketStatus } from '@/shared/lib/ws'
import { Loader, Overlay } from '@/shared/ui'
import { useCallback, useEffect } from 'react'
import styles from './order-feed.module.scss'

export const OrderFeed = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(getStatus)
  const error = useAppSelector(getError)
  const isDisconnected = status !== WebsocketStatus.ONLINE

  const isLoading = status === WebsocketStatus.CONNECTING

  const connectSocket = useCallback(
    () => dispatch(connect(WS_ENDPOINTS.ORDERS_ALL)),
    [dispatch]
  )

  useEffect(() => {
    if (isDisconnected) connectSocket()
  }, [connectSocket, isDisconnected])

  return (
    <>
      <h1 className='text text_type_main-large pt-10 pb-5 '>Лента Заказов</h1>
      {isLoading ? (
        <Loader>
          <Overlay />
        </Loader>
      ) : error ? (
        <div className='text text_color_error text_type_main-default'>
          {error}
        </div>
      ) : (
        <div className={`${styles.page} ga-10`}>
          <Orders />
          <Stats />
        </div>
      )}
    </>
  )
}
