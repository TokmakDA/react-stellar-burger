import { cloneElement, FC, ReactElement, ReactNode } from 'react'
import { Link, LinkProps } from 'react-router-dom'
import styles from './link-item.module.scss'
import { useHover } from '@/hooks'

interface ILinkItem extends LinkProps {
  icon: ReactElement
  hoverType?: 'primary' | 'secondary' | 'error'
  children?: ReactNode
}

const LinkItem: FC<ILinkItem> = ({ icon, children, ...props }) => {
  const { isHovered, onMouseEnter, onMouseLeave } = useHover()

  return (
    <Link
      className={`${styles.link} text text_type_main-medium`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {cloneElement(icon, {
        type: isHovered ? 'primary' : 'secondary',
      })}
      {children}
    </Link>
  )
}

export default LinkItem
