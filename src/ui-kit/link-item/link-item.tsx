import { cloneElement, FC, ReactElement, ReactNode } from 'react'
import { Link, LinkProps } from 'react-router-dom'
import styles from './link-item.module.scss'
import { useHover } from '@/hooks'

interface ILinkItem extends LinkProps {
  icon?: ReactElement
  children?: ReactNode
  className?: string
}

const LinkItem: FC<ILinkItem> = ({ icon, children, className, ...props }) => {
  const { isHovered, onMouseEnter, onMouseLeave } = useHover()

  return (
    <Link
      className={`${className} ${styles.link} text text_type_main-default ga-2 px-5 py-4`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {icon &&
        cloneElement(icon, {
          type: isHovered ? 'primary' : 'secondary',
          className: styles.link__icon,
        })}
      {children}
    </Link>
  )
}

export default LinkItem
