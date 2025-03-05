import { useForgotPasswordMutation } from '@/features/auth'
import { ROUTES } from '@/shared/config'
import { useAuthNavigation, useForm } from '@/shared/lib/hooks'
import { AuthLayout, Button, Input } from '@/shared/ui'
import { FC, FormEvent } from 'react'

const ForgotPassword: FC = () => {
  const { goToResetPassword } = useAuthNavigation()
  const { values, handleChange } = useForm({ email: '' })
  const [forgotPasswordMutation, { isLoading, isError, error }] =
    useForgotPasswordMutation()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await forgotPasswordMutation(values).unwrap()
    goToResetPassword()
  }

  return (
    <AuthLayout
      title='Восстановление пароля'
      footerLinks={[
        { label: 'Вспомнили пароль?', link: ROUTES.LOGIN, title: 'Войти' },
      ]}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      errorMessage={
        isError
          ? `Ошибка запроса кода восстановления: ${error?.data?.message || 'Неизвестная ошибка'}`
          : null
      }
    >
      <Input
        type='email'
        placeholder='Укажите e-mail'
        name='email'
        value={values.email}
        onChange={handleChange}
        disabled={isLoading}
      />

      <Button type='primary' htmlType='submit' disabled={isLoading}>
        Восстановить
      </Button>
    </AuthLayout>
  )
}

export default ForgotPassword
