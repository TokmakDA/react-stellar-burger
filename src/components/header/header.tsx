import type { FC } from 'react'
import styles from './header.module.css'

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <h1>My React App</h1>
    </header>
  )
}
