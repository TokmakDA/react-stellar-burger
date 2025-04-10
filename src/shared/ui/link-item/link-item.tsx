import { cloneElement, FC, ReactElement } from 'react'
import { NavLinkProps, NavLink } from 'react-router'
import styles from './link-item.module.scss'
import { useHover } from '../../lib/hooks'

interface ILinkItem extends NavLinkProps {
  icon?: ReactElement
  extraClass?: string
}

export const LinkItem: FC<ILinkItem> = ({
  icon,
  children,
  extraClass = '',
  to,
  ...props
}) => {
  const { isHovered, onMouseEnter, onMouseLeave } = useHover()

  return (
    <NavLink
      className={({ isActive }) => {
        const classList = [
          styles.link,
          'text text_type_main-default',
          'ga-2 px-5 py-4',
          extraClass,
          isActive ? styles['link_is-active'] : '',
        ]

        return classList.filter(Boolean).join(' ')
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      to={to}
      {...props}
    >
      {({ isActive }) => (
        <>
          {icon &&
            cloneElement(icon, {
              type: isHovered ? 'success' : isActive ? 'primary' : 'secondary',
              className: styles.link__icon,
            })}
          {children}
        </>
      )}
    </NavLink>
  )
}
