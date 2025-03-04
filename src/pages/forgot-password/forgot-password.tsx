import { useForgotPasswordMutation } from '@/features/auth'
import { AuthLayout, Button, Input } from '@/shared/ui'
import { FC, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router'

const ForgotPassword: FC = () => {
  const [email, setEmail] = useState<string>('')

  const [forgotPasswordMutation, { isLoading }] = useForgotPasswordMutation()

  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await forgotPasswordMutation({ email }).unwrap()
    navigate('/reset-password')
  }

  return (
    <AuthLayout
      title='Восстановление пароля'
      footerLinks={[
        { label: 'Вспомнили пароль?', link: '/login', title: 'Войти' },
      ]}
      onSubmit={handleSubmit}
    >
      <Input
        type='email'
        placeholder='Укажите e-mail'
        name='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />

      <Button type='primary' htmlType='submit' disabled={isLoading}>
        Восстановить
      </Button>
    </AuthLayout>
  )
}

export default ForgotPassword
