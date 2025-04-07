import { ROUTES } from '@/shared/config'
import type { FC } from 'react'
import styles from './header.module.scss'
import { Logo, BurgerIcon, ListIcon, LinkItem } from '@/shared/ui'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export const Header: FC = () => {
  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.header__wrapper} py-4 ga-2 px-20`}>
        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            <li className={styles.nav__item}>
              <LinkItem icon={<BurgerIcon type={'primary'} />} to={ROUTES.HOME}>
                Конструктор
              </LinkItem>
            </li>
            <li>
              <LinkItem icon={<ListIcon type='primary' />} to={ROUTES.FEED}>
                Лента заказов
              </LinkItem>
            </li>
          </ul>
        </nav>
        <LinkItem extraClass={styles.header__logo} to={ROUTES.HOME}>
          <Logo />
        </LinkItem>
        <LinkItem
          icon={<ProfileIcon type='primary' />}
          to={ROUTES.PROFILE}
          extraClass={styles.header__actions}
        >
          Личный кабинет
        </LinkItem>
      </div>
    </header>
  )
}
