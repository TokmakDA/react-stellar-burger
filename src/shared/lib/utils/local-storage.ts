const FORGOT = 'forgot'

export const getLocalData = (key: string) => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error(`Ошибка при получении данных из localStorage: ${error}`)
    return null
  }
}

export const setLocalData = <T>(key: string, data: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error(`Ошибка при сохранении данных в localStorage: ${error}`)
  }
}

export const removeLocalData = (key: string) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Ошибка при удалении данных из localStorage: ${error}`)
  }
}

export const isForgotPassword = () => Boolean(getLocalData(FORGOT))
export const selectForgotPassword = () => setLocalData(FORGOT, true)
export const unSelectForgotPassword = () => removeLocalData(FORGOT)
