import type { FC } from 'react'
import styles from './header.module.scss'
import { Logo, BurgerIcon, ListIcon, LinkItem } from '@/ui-kit'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export const Header: FC = () => {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          <li className={styles.nav__item}>
            <LinkItem icon={<BurgerIcon type={'primary'} />} to={'#'}>
              Конструктор
            </LinkItem>
          </li>
          <li>
            <LinkItem icon={<ListIcon type='primary' />} to={'#'}>
              Лента заказов
            </LinkItem>
          </li>
        </ul>
      </nav>
      <div>
        <Logo />
      </div>
      <div>
        <LinkItem icon={<ProfileIcon type='primary' />} to={'#'}>
          Личный кабинет
        </LinkItem>
      </div>
    </header>
  )
}
