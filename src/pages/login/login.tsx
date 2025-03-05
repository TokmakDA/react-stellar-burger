import { useLoginMutation } from '@/features/auth'
import { ROUTES } from '@/shared/config'
import { useAuthNavigation, useForm } from '@/shared/lib/hooks'
import { FC, useState, FormEvent } from 'react'
import { Input, Button, AuthLayout } from '@/shared/ui'

const Login: FC = () => {
  const { goToHome } = useAuthNavigation()
  const { values, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loginMutation, { isLoading, isError, error }] = useLoginMutation()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await loginMutation(values).unwrap()
    resetForm()
    goToHome()
  }

  return (
    <AuthLayout
      title='Вход'
      footerLinks={[
        {
          label: 'Вы — новый пользователь?',
          title: 'Зарегистрироваться',
          link: ROUTES.REGISTER,
        },
        {
          label: 'Забыли пароль?',
          title: 'Восстановить пароль',
          link: ROUTES.FORGOT_PASSWORD,
        },
      ]}
      onSubmit={handleSubmit}
      errorMessage={
        isError
          ? `Ошибка входа: ${error?.data?.message || 'Неизвестная ошибка'}`
          : null
      }
      isLoading={isLoading}
    >
      <Input
        type='email'
        placeholder='E-mail'
        name='email'
        value={values.email}
        onChange={handleChange}
      />
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder='Пароль'
        name='password'
        value={values.password}
        onChange={handleChange}
        icon={showPassword ? 'HideIcon' : 'ShowIcon'}
        onIconClick={() => setShowPassword((prev) => !prev)}
      />
      <Button type='primary' htmlType='submit' disabled={isLoading}>
        {isLoading ? 'Вход...' : 'Войти'}
      </Button>
    </AuthLayout>
  )
}

export default Login
