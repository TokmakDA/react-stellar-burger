import type { FC } from "react"
import { Header } from "@/components/header/header"
import { Outlet } from "react-router"
import styles from "../styles.module.scss"

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
