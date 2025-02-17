import { FC, ReactNode } from 'react'
import styles from './loader.module.scss'

type TLoaderProps = {
  children?: ReactNode | undefined
  textClass?: string
  text?: string
}
export const Loader: FC<TLoaderProps> = ({
  children = undefined,
  textClass = '',
  text = 'Загрузка',
}) => {
  return (
    <div className={styles.loader}>
      <div className={`${styles.loader__text} ${textClass}`}>{text}</div>

      <div className={styles.loader__wrapper}>
        {Array.from({ length: 5 })
          .map((_, i) => i)
          .map((k) => (
            <div key={k} className={styles.loader__circle} />
          ))}
      </div>
      {children}
    </div>
  )
}
