// Форматируем дату
const formatDate: (time: Date, options: object) => string = (time, options) =>
  time.toLocaleDateString('ru-RU', options).replace(/\.|( г.)/gi, '')
// Форматируем Время
const formatTime: (time: Date) => string = (time) =>
  time.toLocaleTimeString('ru-RU', {
    timeStyle: 'short',
    timeZone: 'UTC',
  })

function dayTitle(number: number) {
  if (number > 10 && [11, 12, 13, 14].includes(number % 100)) return 'дней'
  const last_num = number % 10
  if (last_num == 1) return 'день'
  if ([2, 3, 4].includes(last_num)) return 'дня'
  if ([5, 6, 7, 8, 9, 0].includes(last_num)) return 'дней'
  return 'дней'
}

/**
 * Склеить день и время
 * @param day
 * @param time
 */
const joinDayAndTime = (day: string, time: Date): string => {
  return [day, formatTime(time)].filter(Boolean).join(', ')
}
// получить форматированную дату
export const getFormattedDate: (time: string) => string = (time) => {
  const currentTime = new Date()
  const lastTime = new Date(time)

  const periods = {
    days: currentTime.getDate() - lastTime.getDate(),
    weekday: currentTime.getDay() - lastTime.getDay(),
    months: currentTime.getMonth() - lastTime.getMonth(),
    years: currentTime.getFullYear() - lastTime.getFullYear(),
  }

  // const daysOfTheWeek = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']

  // проверяем в период
  if (!periods.days && !periods.weekday && !periods.months && !periods.years) {
    // // Сегодня
    return joinDayAndTime('Сегодня', lastTime)
  }

  if (
    // В течение недели
    periods.days &&
    periods.weekday === periods.days &&
    !periods.months &&
    !periods.years
  ) {
    let prefix = ''

    switch (periods.days) {
      case 1:
        prefix = 'Вчера'
        break
      default:
        prefix = `${periods.days} ${dayTitle(periods.days)} назад`
        break
    }
    return joinDayAndTime(prefix, lastTime)
  }

  // В этом году
  if (periods.weekday !== periods.days && !periods.years) {
    // Вернуть дату (день и месяц)
    return joinDayAndTime(
      formatDate(lastTime, {
        day: 'numeric',
        month: 'long',
      }),
      lastTime
    )
  }

  if (periods.years) {
    // Вернуть дату (день, месяц, год)
    return joinDayAndTime(
      formatDate(lastTime, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      lastTime
    )
  }

  // Вернуть полностью, если не нашли ни чего
  return formatDate(lastTime, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
