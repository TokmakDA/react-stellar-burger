import { isForgotPassword, useResetPasswordMutation } from '@/features/auth'
import { useAuthNavigation, useForm } from '@/shared/lib/hooks'
import { AuthLayout, Button, Input } from '@/shared/ui'
import { FC, FormEvent, useEffect, useState } from 'react'

const ResetPassword: FC = () => {
  const { goToLogin, goToForgotPassword } = useAuthNavigation()
  const { values, handleChange, resetForm } = useForm({
    token: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)

  const [resetPasswordMutation, { isLoading, isError, error }] =
    useResetPasswordMutation()

  useEffect(() => {
    if (!isForgotPassword()) {
      goToForgotPassword()
    }
  }, [goToForgotPassword])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await resetPasswordMutation(values).unwrap()
    resetForm()
    goToLogin()
  }

  return (
    <AuthLayout
      title='Восстановление пароля'
      footerLinks={[
        { label: 'Вспомнили пароль?', link: '/login', title: 'Войти' },
      ]}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      errorMessage={
        isError ? error?.data?.message || 'Неизвестная ошибка' : null
      }
    >
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder='Пароль'
        name='password'
        value={values.password}
        onChange={handleChange}
        icon={showPassword ? 'HideIcon' : 'ShowIcon'}
        onIconClick={() => setShowPassword((prev) => !prev)}
      />
      <Input
        type='text'
        placeholder='Введите код из письма'
        name='token'
        value={values.token}
        onChange={handleChange}
      />
      <Button type='primary' htmlType='submit' disabled={isLoading}>
        Сохранить
      </Button>
    </AuthLayout>
  )
}

export default ResetPassword
