import { useHover } from '@/hooks'
import { cloneElement, FC, ReactElement } from 'react'
import styles from './hover-wrapper.module.scss'

type TIconTypes = 'secondary' | 'primary' | 'error' | 'success' | 'disabled'

interface IHoverWrapperProps {
  children: ReactElement
  className?: string
  type?: TIconTypes
  hoveredType?: TIconTypes
  isScalable?: boolean
}

const HoverWrapper: FC<IHoverWrapperProps> = ({
  children,
  className = '',
  type = 'primary',
  hoveredType = 'secondary',
  isScalable = false,
}) => {
  const { isHovered, onMouseEnter, onMouseLeave } = useHover()

  const wrapperClasses = [
    styles.wrapper,
    className,
    isScalable && styles.wrapper_scalable,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {cloneElement(children, {
        type: isHovered ? hoveredType : type,
        className:
          `${children.props.className || ''} ${styles.wrapper__item}`.trim(),
      })}
    </div>
  )
}

export default HoverWrapper
