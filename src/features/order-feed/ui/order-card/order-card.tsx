import { TOrder } from '@/features/order-feed'
import { CurrencyIcon } from '@/shared/ui'
import { FC } from 'react'
import styles from './order-card.module.scss'

export const OrderCard: FC<TOrder> = (card) => (
  <article className={styles['order-card']}>
    <header className={styles['order-card__header']}>
      <span className='text text_type_digits-default text_color_primary'>
        #{card.number}
      </span>
      <time className='text text_type_main-default text_color_inactive'>
        {card.createdAt}
      </time>
    </header>
    <h2 className='text text_type_main-medium text_color_primary'>
      {card.name}
    </h2>
    <div className={`${styles['order-card__footer']} ga-6`}>
      <ul className={styles['order-card__ingredients']}>/* ингредиенты */</ul>
      <div className={`${styles['order-card__price']} ga-2`}>
        <span className='text text_type_digits-default'>555</span>
        <CurrencyIcon type='primary' />
      </div>
    </div>
  </article>
)
