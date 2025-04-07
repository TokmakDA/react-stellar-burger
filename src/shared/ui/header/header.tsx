import { ROUTES } from '@/shared/config'
import type { FC } from 'react'
import styles from './header.module.scss'
import { Logo, BurgerIcon, ListIcon, LinkItem } from '@/shared/ui'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export const Header: FC = () => {
  const links = {
    home: ROUTES.HOME,
    orders: ROUTES.FEED,
    profile: ROUTES.PROFILE,
  }

  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.header__wrapper} py-4 ga-2 px-20`}>
        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            <li className={styles.nav__item}>
              <LinkItem icon={<BurgerIcon type={'primary'} />} to={links.home}>
                Конструктор
              </LinkItem>
            </li>
            <li>
              <LinkItem icon={<ListIcon type='primary' />} to={links.orders}>
                Лента заказов
              </LinkItem>
            </li>
          </ul>
        </nav>
        <Logo className={styles.header__logo} />
        <LinkItem
          icon={<ProfileIcon type='primary' />}
          to={links.profile}
          className={styles.header__actions}
        >
          Личный кабинет
        </LinkItem>
      </div>
    </header>
  )
}
