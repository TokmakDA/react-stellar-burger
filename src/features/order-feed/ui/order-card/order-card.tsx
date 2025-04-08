import { useAppSelector } from '@/app/hooks'
import { selectIngredientsData } from '@/entities/ingredient'
import { TOrder } from '@/features/order-feed'
import { getFormattedDate } from '@/shared/lib/utils'
import { CurrencyIcon } from '@/shared/ui'
import { GradientCircle } from '@/shared/ui/gradient-circle/gradient-circle.tsx'
import { FC, useMemo } from 'react'
import styles from './order-card.module.scss'

const ORDER_STATUS: Record<string, string> = {
  done: 'Выполнен',
  pending: 'Готовится',
  created: 'Создан',
}

type OrderCardProps = {
  order: TOrder
}

export const OrderCard: FC<OrderCardProps> = ({ order }) => {
  const { ingredients } = useAppSelector(selectIngredientsData)

  const orderIngredients = useMemo(() => {
    return order.ingredients
      .map((id) => ingredients.find((i) => i._id === id))
      .filter((i): i is NonNullable<typeof i> => Boolean(i))
  }, [order.ingredients, ingredients])

  const price = useMemo(() => {
    return orderIngredients.reduce((acc, cur) => acc + cur.price, 0)
  }, [orderIngredients])

  const maxVisible = 6
  const visibleIngredients = orderIngredients.slice(0, maxVisible)
  const hiddenCount = orderIngredients.length - maxVisible

  return (
    <article className={styles['order-card']}>
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
        <span
          className={`text text_type_main-default ${
            order.status === 'done'
              ? 'text_color_success'
              : 'text_color_primary'
          }`}
        >
          {ORDER_STATUS[order.status] || 'Неизвестен'}
        </span>
      </div>

      <div className={`${styles['order-card__footer']} ga-6`}>
        <ul className={styles['order-card__ingredients']}>
          {visibleIngredients.map((ingredient, index) => {
            const isLast = index === maxVisible - 1 && hiddenCount > 0
            return (
              <li
                key={index}
                className={styles['order-card__ingredient']}
                style={{ zIndex: maxVisible - index }}
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
