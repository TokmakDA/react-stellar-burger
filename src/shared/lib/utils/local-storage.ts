export const getLocalData = <T>(key: string): T | null => {
  try {
    const data = localStorage.getItem(key)
    if (!data) return null

    if (data === 'true') return true as T
    if (data === 'false') return false as T

    if (!isNaN(Number(data))) return Number(data) as T

    if (data.startsWith('{') || data.startsWith('[')) {
      return JSON.parse(data) as T
    }

    return data as unknown as T
  } catch (error) {
    console.error(`Ошибка при получении данных из localStorage:`, error)
    return null
  }
}

export const setLocalData = <T>(key: string, data: T) => {
  try {
    localStorage.setItem(
      key,
      typeof data !== 'string' ? JSON.stringify(data) : data
    )
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
