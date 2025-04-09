import { useAppSelector } from '@/app/hooks'
import { selectIngredientsMap } from '@/entities/ingredient'
import { ORDER_STATUS } from '@/entities/order/lib'
import { TOrder } from '@/features/order-feed'
import { getFormattedDate } from '@/shared/lib/utils'
import { TIngredient } from '@/shared/types'
import { CurrencyIcon } from '@/shared/ui'
import { GradientCircle } from '@/shared/ui/gradient-circle/gradient-circle.tsx'
import { CSSProperties, FC, useMemo } from 'react'
import styles from './order-card.module.scss'

type OrderCardProps = {
  order: TOrder
  isShowStatus?: boolean
  onClick: (id: string) => void
}

export const OrderCard: FC<OrderCardProps> = ({
  order,
  isShowStatus = false,
  onClick,
}) => {
  const ingredientsMap = useAppSelector(selectIngredientsMap)

  const orderIngredients = useMemo(() => {
    return order.ingredients
      .map((id) => ingredientsMap.get(id))
      .filter((i): i is TIngredient => Boolean(i))
  }, [order.ingredients, ingredientsMap])

  const price = useMemo(() => {
    return orderIngredients.reduce((acc, cur) => acc + cur.price, 0)
  }, [orderIngredients])

  const maxVisible = 6
  const visibleIngredients = orderIngredients.slice(0, maxVisible)
  const hiddenCount = orderIngredients.length - maxVisible

  const handleCLick = () => {
    onClick(order._id)
  }
  return (
    <article className={styles['order-card']} onClick={handleCLick}>
      <header className={styles['order-card__header']}>
        <span className='text text_type_digits-default text_color_primary'>
          #{order.number}
        </span>
        <time className='text text_type_main-default text_color_inactive'>
          {getFormattedDate(order.createdAt)}
        </time>
      </header>

      <div className={`${styles['order-card__main']} ga-2`}>
        <h2 className='text text_type_main-medium text_color_primary'>
          {order.name}
        </h2>
        {isShowStatus && (
          <span
            className={`text text_type_main-default ${
              order.status === 'done'
                ? 'text_color_success'
                : 'text_color_primary'
            }`}
          >
            {ORDER_STATUS[order.status] || 'Неизвестен'}
          </span>
        )}
      </div>

      <div className={`${styles['order-card__footer']} ga-6`}>
        <ul className={` list-no-style ${styles['order-card__ingredients']}`}>
          {visibleIngredients.map((ingredient, index) => {
            const isLast = index === maxVisible - 1 && hiddenCount > 0
            return (
              <li
                key={`${ingredient._id}-${index}`}
                className={styles['order-card__ingredient']}
                style={{ zIndex: maxVisible - index } as CSSProperties}
              >
                <GradientCircle>
                  <img
                    src={ingredient.image_mobile}
                    alt={ingredient.name}
                    className={styles['order-card__image']}
                  />
                  {isLast && (
                    <span
                      className={`${styles['order-card__overlay']} text text_type_main-default`}
                    >
                      +{hiddenCount}
                    </span>
                  )}
                </GradientCircle>
              </li>
            )
          })}
        </ul>

        <div className={`${styles['order-card__price']} ga-2`}>
          <span className='text text_type_digits-default'>{price}</span>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </article>
  )
}
