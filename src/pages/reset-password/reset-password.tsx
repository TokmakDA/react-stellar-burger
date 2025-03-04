import { useResetPasswordMutation } from '@/features/auth'
import { AuthLayout, Button, Input } from '@/shared/ui'
import { FC, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router'

const ResetPassword: FC = () => {
  const [token, setToken] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [resetPasswordMutation, { isLoading }] = useResetPasswordMutation()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await resetPasswordMutation({ token, password })
    navigate('login')
  }

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const onIconClick = () => setShowPassword((prev) => !prev)

  return (
    <AuthLayout
      title='Восстановление пароля'
      footerLinks={[
        { label: 'Вспомнили пароль?', link: '/login', title: 'Войти' },
      ]}
      onSubmit={handleSubmit}
    >
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder='Пароль'
        name='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={showPassword ? 'HideIcon' : 'ShowIcon'}
        onIconClick={onIconClick}
      />
      <Input
        type='text'
        placeholder='Введите код из письма'
        name='token'
        value={token}
        onChange={(e) => setToken(e.target.value)}
        onPointerEnterCapture={undefined}
      />

      <Button type='primary' htmlType='submit' disabled={isLoading}>
        Сохранить
      </Button>
    </AuthLayout>
  )
}

export default ResetPassword
