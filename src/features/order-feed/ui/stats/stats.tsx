import { useAppSelector } from '@/app/hooks'
import {
  getOrderNumbersDone,
  getOrderNumbersInWork,
  getOrdersStats,
} from '@/features/order-feed'
import { useMemo } from 'react'
import { splitIntoColumns } from '@/shared/lib/utils'
import styles from './stats.module.scss'
import { OrderNumbersGroup } from './order-numbers-group'

export const Stats = () => {
  const done = useAppSelector(getOrderNumbersDone)
  const inWork = useAppSelector(getOrderNumbersInWork)
  const stats = useAppSelector(getOrdersStats)

  const doneColumns = useMemo(() => splitIntoColumns(done, 10), [done])
  const inWorkColumns = useMemo(() => splitIntoColumns(inWork, 10), [inWork])

  return (
    <aside className={styles.stats} aria-label='Общая информация по заказам'>
      <div className={styles.stats__board}>
        <OrderNumbersGroup
          title="Готовы:"
          columns={doneColumns}
          isDone
          className={styles.stats__group}
        />
        <OrderNumbersGroup
          title="В работе:"
          columns={inWorkColumns}
          className={styles.stats__group}
        />
      </div>

      <div className={styles.stats__block}>
        <h3 className="text text_type_main-medium text_color_primary">
          Выполнено за все время:
        </h3>
        <span className={`text text_type_digits-large text_color_primary ${styles.stats__value}`}>
          {stats.total}
        </span>
      </div>

      <div className={styles.stats__block}>
        <h3 className="text text_type_main-medium text_color_primary">
          Выполнено за сегодня:
        </h3>
        <span className={`text text_type_digits-large text_color_primary ${styles.stats__value}`}>
          {stats.totalToday}
        </span>
      </div>
    </aside>
  )
}
