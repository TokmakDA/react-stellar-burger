import { useAppSelector } from '@/app/hooks'
import { OrderDetails } from '@/entities/order'
import { getOrderFeed, TOrder } from '@/features/order-feed'
import { EmptyPage } from '@/shared/ui'
import { useEffect } from 'react'
import { useParams } from 'react-router'

export const OrderInfo = () => {
  const orderFeed = useAppSelector(getOrderFeed)

  const { orderId } = useParams()
  const order = orderFeed[0] as TOrder

  useEffect(() => {
    // if (orderId) {
    //   const feed = orderFeed.find((o) => o._id === orderId)
    //   if (feed) order = feed
    //   else order = orderFeed[0]
    // }
    console.log(orderFeed)
  }, [])

  if (!orderId || !order) {
    return <EmptyPage />
  }

  return <OrderDetails order={order} />
}
