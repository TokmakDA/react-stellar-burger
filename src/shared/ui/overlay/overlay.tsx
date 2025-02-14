import { FC } from 'react'
import styles from './overlay.module.scss'
import { MouseEvent } from 'react'

interface OverlayProps {
  onClick?: () => void
  persistent?: boolean
}

export const Overlay: FC<OverlayProps> = ({ onClick, persistent = false }) => {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const parentElement = event.currentTarget.parentElement
    if (persistent && parentElement) {
      parentElement.classList.add(styles.blink)
      setTimeout(() => {
        parentElement.classList.remove(styles.blink)
      }, 300)
    } else {
      if (onClick) {
        onClick()
      }
    }
  }

  return <div className={styles.overlay} onClick={handleClick} />
}
