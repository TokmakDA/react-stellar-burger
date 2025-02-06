import { FC, ReactNode, useRef } from 'react'
import styles from './scrollable-container.module.scss'
import { useDynamicHeight } from '@/hooks'

interface IScrollableContainerProps {
  children: ReactNode
  offset?: number
  className?: string
}

const ScrollableContainer: FC<IScrollableContainerProps> = ({
  children,
  offset = 20,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const maxHeight = useDynamicHeight(containerRef, offset)

  return (
    <div
      ref={containerRef}
      className={`${styles.scrollableContainer} ${className}`}
      style={{ maxHeight: `${maxHeight}px`, overflowY: 'auto' }}
    >
      {children}
    </div>
  )
}

export default ScrollableContainer
