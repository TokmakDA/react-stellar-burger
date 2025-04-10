import { FC, ReactNode } from 'react'
import styles from './gradient-circle.module.scss'

interface GradientCircleProps {
  children: ReactNode
  size?: number
}

export const GradientCircle: FC<GradientCircleProps> = ({
  children,
  size = 64,
}) => {
  return (
    <div className={styles.wrapper} style={{ width: size, height: size }}>
      <div className={styles.inner}>{children}</div>
    </div>
  )
}
