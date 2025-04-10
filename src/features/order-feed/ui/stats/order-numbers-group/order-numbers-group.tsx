import styles from '../stats.module.scss'

type OrderNumbersGroupProps = {
  title: string
  columns: number[][]
  isDone?: boolean
  className?: string
}

export const OrderNumbersGroup = ({
  title,
  columns,
  isDone = false,
  className = '',
}: OrderNumbersGroupProps) => {
  return (
    <div className={className}>
      <h3 className='text text_type_main-medium text_color_primary'>{title}</h3>
      <div className={styles.stats__columns}>
        {columns.map((col, index) => (
          <ul
            key={index}
            className={`list-no-style ${styles['stats__number-list']}`}
          >
            {col.map((i) => (
              <li
                key={i}
                className={`text text_type_digits-default ${
                  isDone ? 'text_color_success' : 'text_color_primary'
                }`}
              >
                {i}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
