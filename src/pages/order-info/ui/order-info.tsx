import { useAppSelector } from '@/app/hooks'
import { OrderDetails, useLazyGetOrderQuery } from '@/entities/order'

import { Loader, StatePage } from '@/shared/ui'
import { useEffect } from 'react'
import { useParams } from 'react-router'

export const OrderInfo = () => {
  const [getOrder, { data, isLoading, error }] = useLazyGetOrderQuery()

  const orderNum = Number(useParams()?.orderNum)

  const order = useAppSelector((state) => {
    const byNumber = (o: { number: number }) => o.number === orderNum

    const feedOrder = state.orderFeed.orders.find(byNumber)
    const profileOrder = state.profileOrders.orders.find(byNumber)

    return feedOrder || profileOrder || data
  })

  useEffect(() => {
    if (!order && orderNum) {
      getOrder(orderNum)
    }
  }, [getOrder, order, orderNum])

  if (!orderNum || Number.isNaN(orderNum)) return <StatePage type='notfound' />
  if (isLoading) return <Loader />
  if (error) return <StatePage type='error' />
  if (!order) return <StatePage type='empty' />

  return <OrderDetails order={order} />
}
