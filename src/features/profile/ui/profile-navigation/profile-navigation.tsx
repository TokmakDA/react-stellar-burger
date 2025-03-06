import { useLogoutMutation } from '@/features/auth'
import { ROUTES } from '@/shared/config'
import { IFetchQueryErrorResponse } from '@/shared/types'
import { Loader, Overlay } from '@/shared/ui'
import { useState, useEffect, useMemo } from 'react'
import { NavLink, useLocation } from 'react-router'
import styles from './profile-navigation.module.scss'

const ProfileNavigation = () => {
  const location = useLocation()
  const [description, setDescription] = useState<string>('')

  const [logoutMatation, { isLoading, isError, error }] = useLogoutMutation()

  const links = useMemo(
    () => [
      {
        path: ROUTES.PROFILE,
        title: 'Профиль',
        description:
          'В этом разделе вы можете изменить свои персональные данные',
      },
      {
        path: ROUTES.PROFILE_ORDERS,
        title: 'История заказов',
        description:
          'В этом разделе вы можете просмотреть свою историю заказов',
      },
    ],
    []
  )

  useEffect(() => {
    const activeLink = links.find((link) => link.path === location.pathname)
    setDescription(activeLink?.description || '')
  }, [location, links])

  return (
    <>
      <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          {links.map((link) => (
            <li key={link.path} className={styles[`nav__list-item`]}>
              <NavLink
                end
                to={link.path}
                className={({ isActive }) =>
                  `text text_type_main-medium ${styles.nav__link} ${isActive ? styles.nav__link_active : ''}`
                }
              >
                {link.title}
              </NavLink>
            </li>
          ))}
          <li className={styles[`nav__list-item`]}>
            <button
              className={`text text_type_main-medium ${styles.nav__link} `}
              disabled={isLoading}
              onClick={() => logoutMatation()}
            >
              Выход
            </button>
          </li>
        </ul>
      </nav>
      {isError && (
        <p className='text text_color_error'>
          Ошибка:{' '}
          {(error as IFetchQueryErrorResponse).data?.message ||
            'Неизвестная ошибка'}
        </p>
      )}
      <div
        className={`${styles.nav__description} pt-20 text_type_main-default text_color_inactive`}
      >
        {description}
      </div>

      {isLoading && (
        <Loader text='Выход'>
          <Overlay />
        </Loader>
      )}
    </>
  )
}

export default ProfileNavigation
