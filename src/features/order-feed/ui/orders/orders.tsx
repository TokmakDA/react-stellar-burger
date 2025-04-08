import { useAppSelector } from '@/app/hooks'
import { getOrderFeed } from '@/features/order-feed'
import { OrderCard } from '@/features/order-feed/ui/order-card'

export const Orders = () => {
  const orderFeed = useAppSelector(getOrderFeed)

  return (
    <div>
      {orderFeed.map((item) => (
        <div className='p-1' key={item._id}>
          <OrderCard order={item} />
        </div>
      ))}
    </div>
  )
}
