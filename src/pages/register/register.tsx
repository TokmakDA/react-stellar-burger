import { useRegisterMutation } from '@/features/auth'
import { useAuthNavigation, useForm } from '@/shared/lib/hooks'
import { Input, Button, AuthLayout } from '@/shared/ui'
import { FC, FormEvent, useState } from 'react'

const Register: FC = () => {
  const { goToHome } = useAuthNavigation()
  const { values, handleChange, resetForm } = useForm({
    name: '',
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)

  const [registerMutation, { isLoading, isError, error }] =
    useRegisterMutation()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await registerMutation(values).unwrap()
    resetForm()
    goToHome()
  }

  return (
    <AuthLayout
      title='Регистрация'
      footerLinks={[
        { label: 'Уже зарегистрированы?', link: '/login', title: 'Войти' },
      ]}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      errorMessage={
        isError
          ? `Ошибка регистрации: ${error?.data?.message || 'Неизвестная ошибка'}`
          : null
      }
    >
      <Input
        type='text'
        placeholder='Имя'
        name='name'
        value={values.name}
        onChange={handleChange}
      />
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
        Зарегистрироваться
      </Button>
    </AuthLayout>
  )
}

export default Register
