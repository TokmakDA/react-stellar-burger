import { FC } from 'react'
import styles from './order-details.module.scss'
import done from '@/assets/images/done.svg'

type TOrderDetailsProps = {
  order: string | number
}

const OrderDetails: FC<TOrderDetailsProps> = ({ order }) => {
  return (
    <div className={`${styles.order} pt-3 pb-20`}>
      <header className={styles.order__header}>
        <p className={`${styles.order__number} text text_type_digits-large`}>
          {order}
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
    </div>
  )
}

export default OrderDetails
