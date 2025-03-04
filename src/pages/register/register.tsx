import { useRegisterMutation } from '@/features/auth'
import { Input, Button, AuthLayout, Loader, Overlay } from '@/shared/ui'
import { FC, FormEvent, useState } from 'react'

const Register: FC = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [registerMutation, { isLoading }] = useRegisterMutation()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await registerMutation({ email, password, name }).unwrap()
  }

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const onIconClick = () => setShowPassword((prev) => !prev)

  return (
    <>
      <AuthLayout
        title='Регистрация'
        footerLinks={[
          { label: 'Уже зарегистрированы?', link: '/login', title: 'Войти' },
        ]}
        onSubmit={handleSubmit}
      >
        <Input
          type='text'
          placeholder='Имя'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          Зарегистрироваться
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

export default Register
