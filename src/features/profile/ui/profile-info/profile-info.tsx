import { useGetUserQuery, useUpdateUserMutation } from '@/entities/user'
import { useForm } from '@/shared/lib/hooks'
import { IFetchQueryErrorResponse } from '@/shared/types'
import { Loader, Button, Input } from '@/shared/ui'
import { useEffect, useState, useCallback } from 'react'
import styles from './profile-info.module.scss'

interface UserFormValues {
  name: string
  email: string
  password: string
}

const ProfileInfo = () => {
  const {
    data,
    isError: isGetError,
    isLoading: isGetLoading,
    isSuccess,
    error: getError,
  } = useGetUserQuery()
  const [
    updateUserMutation,
    { isError: isUpdateError, isLoading: isUpdateLoading, error: updateError },
  ] = useUpdateUserMutation()

  const { values, handleChange, resetForm } = useForm({
    name: '',
    email: '',
    password: '',
  })
  const [changedList, setChangedList] = useState<(keyof UserFormValues)[]>([])

  const fields: Record<
    keyof UserFormValues,
    { title: string; type: 'text' | 'password' | 'email' }
  > = {
    name: { title: 'Имя', type: 'text' },
    email: { title: 'Email', type: 'email' },
    password: { title: 'Пароль', type: 'password' },
  }

  const handleIconClick = (k: keyof UserFormValues) => {
    setChangedList((prev) =>
      prev.includes(k) ? prev.filter((i) => i !== k) : [...prev, k]
    )
  }

  const resetUserForm = useCallback(() => {
    resetForm({
      name: data?.name || '',
      email: data?.email || '',
      password: '',
    })
  }, [data, resetForm])

  useEffect(() => {
    if (isSuccess) {
      resetUserForm()
    }
  }, [isSuccess])

  const handleSubmit = async () => {
    const changed = changedList.reduce<Partial<UserFormValues>>((prev, key) => {
      if (values[key] && values[key] !== data?.[key as keyof typeof data]) {
        prev[key] = values[key]
      }
      return prev
    }, {})
    if (Object.keys(changed).length !== 0) {
      await updateUserMutation(changed)
    }
    setChangedList([])
  }

  const handleCancel = () => {
    setChangedList([])
    resetUserForm()
  }

  const errorMessage =
    ((getError || updateError) &&
      ((getError || updateError) as IFetchQueryErrorResponse).data?.message) ||
    'Неизвестная ошибка'

  return (
    <div className={`${styles.wrapper} ga-6`}>
      <div className={styles.wrapper__fields}>
        {Object.entries(fields).map(([k, v]) => (
          <Input
            key={k}
            placeholder={v.title}
            type={v.type}
            name={k}
            value={values[k as keyof UserFormValues] || ''}
            onChange={handleChange}
            icon={
              changedList.includes(k as keyof UserFormValues)
                ? 'CloseIcon'
                : 'EditIcon'
            }
            readOnly={!changedList.includes(k as keyof UserFormValues)}
            onIconClick={() => handleIconClick(k as keyof UserFormValues)}
          />
        ))}
      </div>
      {(isGetError || isUpdateError) && (
        <p className='text_color_error'>{errorMessage}</p>
      )}
      {changedList.length > 0 && (
        <div className={styles.wrapper__actions}>
          <Button
            htmlType='button'
            type='secondary'
            onClick={handleCancel}
            size='large'
          >
            Отмена
          </Button>
          <Button
            htmlType='button'
            type='primary'
            onClick={handleSubmit}
            size='large'
          >
            Сохранить
          </Button>
        </div>
      )}
      {(isGetLoading || isUpdateLoading) && <Loader overlay />}
    </div>
  )
}

export default ProfileInfo
