export const formatNumberToRu = (value: number | string): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(num)) {
    console.error(`Ошибка: ${value} не является числом`)
    return '0,0'
  }

  return num.toLocaleString('ru-RU', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 1,
  })
}
