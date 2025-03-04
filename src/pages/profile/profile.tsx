import { useLogoutMutation } from '@/features/auth'
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { ChangeEvent } from 'react'
import { Link } from 'react-router'

const Profile = () => {
  const [logoutMutation, { isLoading }] = useLogoutMutation()

  const logout = () => {
    logoutMutation()
  }

  return (
    <section>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/profile'>Профиль</Link>
            </li>
            <li>
              <Link to='/profile/orders'>Мои заказы</Link>
            </li>
            <li>
              <Button onClick={logout} htmlType={'button'} disabled={isLoading}>
                Выйти
              </Button>
            </li>
          </ul>
        </nav>
        <div>
          <p>В этом разделе вы можете изменить свои персональные данные</p>
        </div>
      </div>
      <div>
        <Input
          value={''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            console.log('Input value changed', e.target.value)
          }}
        />
        <Input
          value={''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            console.log('Input value changed', e.target.value)
          }}
        />
        <Input
          value={''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            console.log('Input value changed', e.target.value)
          }}
        />
      </div>
    </section>
  )
}

export default Profile
