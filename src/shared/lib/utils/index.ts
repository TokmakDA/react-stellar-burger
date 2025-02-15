export const formatNumberToRu = (value: number | string) => {
  return value.toLocaleString('ru-RU', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 1,
  })
}
