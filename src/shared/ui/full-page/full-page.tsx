import { FC, ReactNode } from 'react'
import styles from './full-page.module.scss'

interface ModalProps {
  children: ReactNode
}

export const FullPage: FC<ModalProps> = ({ children }) => {
  return (
    <div className={`${styles['full-page']}`}>
      <div className={styles['full-page__container']}>{children}</div>
    </div>
  )
}
