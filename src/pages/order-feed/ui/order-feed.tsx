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

import { useDispatch, useSelector } from 'react-redux'

export const OrderFeed = () => {
  const dispatch = useDispatch()
  const status = useSelector(getStatus)
  const error = useSelector(getError)
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
      <section>
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
          <>
            <Orders />
            <Stats />
          </>
        )}
      </section>
    </>
  )
}
