import { getOrderFeed } from '@/features/order-feed'
import { OrderCard } from '@/features/order-feed/ui/order-card'

import { useSelector } from 'react-redux'

export const Orders = () => {
  const orderFeed = useSelector(getOrderFeed)

  return (
    <div>
      {orderFeed.map((item) => (
        <div className='p-1' key={item._id}>
          <OrderCard {...item} />
        </div>
      ))}
    </div>
  )
}
