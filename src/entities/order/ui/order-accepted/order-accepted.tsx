import { TNewOrder } from '@/entities/order/model/types.ts'
import { Loader, StatePage } from '@/shared/ui'
import { FC } from 'react'
import styles from './order-accepted.module.scss'
import done from '@/assets/images/done.svg'

type TOrderDetailsProps = {
  data?: TNewOrder
  isLoading: boolean
  isError: boolean
}

const OrderAccepted: FC<TOrderDetailsProps> = ({
  data,
  isLoading,
  isError,
}) => {
  if (isLoading) {
    return (
      <section className={`${styles.order} my-6`}>
        <Loader text='Заказ оформляется' />
      </section>
    )
  }

  if (isError)
    return <StatePage type='error' title='Ошибка оформления заказа' />

  return (
    <section className={`${styles.order} py-20`}>
      <header className={styles.order__header}>
        <p className={`${styles.order__number} text text_type_digits-large`}>
          {data?.order.number}
        </p>
        <h2 className={styles.order__title}>идентификатор заказа</h2>
      </header>
      <div>
        <img
          className={styles.order__icon}
          src={done}
          alt='Статус выполнения'
        />
      </div>
      <div className={styles.order__details}>
        <p className={`${styles.order__status} text text_type_main-default`}>
          Ваш заказ начали готовить
        </p>
        <p
          className={`${styles.order__note} text text_type_main-default text_color_inactive`}
        >
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </section>
  )
}

export default OrderAccepted
