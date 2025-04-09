import { useAppSelector } from '@/app/hooks'
import { OrderCard } from '@/entities/order'
import { getOrderFeed } from '@/features/order-feed'
import { ROUTES } from '@/shared/config'
import { useModalNavigation } from '@/shared/lib/hooks'
import { buildPath } from '@/shared/lib/utils'
import { scrollSectionStyles } from '@/shared/styles/layouts'
import { useCallback } from 'react'

export const Orders = () => {
  const orderFeed = useAppSelector(getOrderFeed)
  const { navigateWithBackground } = useModalNavigation()

  const handleCardClick = useCallback(
    (id: string) => {
      navigateWithBackground(
        buildPath(ROUTES.ORDER_FEED_DETAILS, { orderId: id })
      )
    },
    [navigateWithBackground]
  )
  return (
    <section
      aria-label='Список заказов'
      className={`${scrollSectionStyles['scroll-section']}`}
    >
      <div
        className={`${scrollSectionStyles['scroll-section__scroll-wrapper']} mb-10 pr-2`}
      >
        <ul
          className={`${scrollSectionStyles['scroll-section__container']} list-no-style ga-4`}
        >
          {orderFeed.map((item) => (
            <li key={item._id}>
              <OrderCard order={item} onClick={handleCardClick} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
