import { ChangeEvent, useState } from 'react'

export const useForm = <T extends Record<string, string>>(initialState: T) => {
  const [values, setValues] = useState<T>(initialState)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => setValues(initialState)

  return { values, handleChange, resetForm }
}
