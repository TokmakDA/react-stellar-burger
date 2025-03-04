import { useLoginMutation } from '@/features/auth'
import { FC, useState, FormEvent } from 'react'
import { Input, Button, AuthLayout, Loader, Overlay } from '@/shared/ui'
import { useLocation, useNavigate } from 'react-router'

const Login: FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loginMutation, { isLoading }] = useLoginMutation()

  const navigate = useNavigate()
  const location = useLocation()

  const onNavigate = () => {
    navigate(location.state?.from || '/', { replace: true })
  }

  const onIconClick = () => setShowPassword((prev) => !prev)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await loginMutation({ email, password }).unwrap()
    onNavigate()
  }

  return (
    <>
      <AuthLayout
        title='Вход'
        footerLinks={[
          {
            label: 'Вы — новый пользователь?',
            title: 'Зарегистрироваться',
            link: '/register',
          },
          {
            label: 'Забыли пароль?',
            title: 'Восстановить пароль',
            link: '/forgot-password',
          },
        ]}
        onSubmit={handleSubmit}
      >
        <Input
          type='email'
          placeholder='E-mail'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder='Пароль'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={showPassword ? 'HideIcon' : 'ShowIcon'}
          onIconClick={onIconClick}
        />
        <Button type='primary' htmlType='submit'>
          Войти
        </Button>
      </AuthLayout>
      {isLoading && (
        <Loader>
          <Overlay />
        </Loader>
      )}
    </>
  )
}

export default Login
