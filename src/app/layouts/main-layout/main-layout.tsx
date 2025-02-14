import type { FC } from 'react'
import { Header } from '@/shared/ui'
import { Outlet } from 'react-router'
import styles from './main-layout.module.scss'

export const MainLayout: FC = () => {
  return (
    <div className={styles[`layout-container`]}>
      <Header />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  )
}
