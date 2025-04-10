import { useAppSelector } from '@/app/hooks'
import { selectIngredientsMap } from '@/entities/ingredient'
import { ORDER_STATUS } from '@/entities/order/lib'
import { OrderIngredient } from '@/entities/order/ui/order-details/order-ingredient'
import { useBackgroundLocation } from '@/shared/lib/hooks'
import { getFormattedDate } from '@/shared/lib/utils'
import { TIngredient, TOrder } from '@/shared/types'
import { CurrencyIcon } from '@/shared/ui'
import { FC, useMemo } from 'react'
import styles from './order-details.module.scss'

type OrderDetailsProps = {
  order: TOrder
}

export const OrderDetails: FC<OrderDetailsProps> = ({ order }) => {
  const ingredientsMap = useAppSelector(selectIngredientsMap)
  const { isBackground } = useBackgroundLocation()

  const orderIngredients = useMemo(() => {
    const countMap = new Map<string, number>()

    order.ingredients.forEach((id) => {
      countMap.set(id, (countMap.get(id) || 0) + 1)
    })

    const uniqueIngredients: (TIngredient & { count: number })[] = []

    for (const [id, count] of countMap.entries()) {
      const ingredient = ingredientsMap.get(id)
      if (ingredient) {
        uniqueIngredients.push({ ...ingredient, count })
      }
    }

    return uniqueIngredients
  }, [order.ingredients, ingredientsMap])

  const price = useMemo(() => {
    return orderIngredients.reduce((acc, cur) => acc + cur.price * cur.count, 0)
  }, [orderIngredients])

  return (
    <section className={styles.order}>
      <header
        className={styles.order__header}
        style={isBackground ? { alignSelf: 'start' } : {}}
      >
        <h2 className={`text text_type_digits-default text_color_primary`}>
          #{order.number}
        </h2>
      </header>

      <div className={styles.order__info}>
        <h3 className='text text_type_main-medium text_color_primary'>
          {order.name}
        </h3>
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
      <div className={styles.order__ingredients}>
        <h3 className='text text_type_main-medium text_color_primary'>
          Состав:
        </h3>
        <ul className={`list-no-style ${styles['order__scroll-area']}`}>
          {orderIngredients.map((ingredient) => {
            return (
              <li key={ingredient._id}>
                <OrderIngredient ingredient={ingredient} />
              </li>
            )
          })}
        </ul>
      </div>

      <div className={styles.order__footer}>
        <time className='text text_type_main-default text_color_inactive'>
          {getFormattedDate(order.createdAt)}
        </time>

        <div className={styles.order__price}>
          <span className='text text_type_digits-default'>{price}</span>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </section>
  )
}
