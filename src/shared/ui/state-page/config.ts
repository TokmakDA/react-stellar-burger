export const statePresets = {
  empty: {
    title: 'Пусто',
    description: 'Здесь пока ничего нет.',
    emoji: '📭',
  },
  error: {
    title: 'Ошибка',
    description: 'Произошла ошибка. Попробуйте позже.',
    emoji: '❌',
  },
  notfound: {
    title: 'Не найдено',
    description: 'Такой страницы не существует.',
    emoji: '🔍',
  },
  unauthorized: {
    title: 'Доступ запрещён',
    description: 'Войдите в аккаунт, чтобы продолжить.',
    emoji: '🔒',
  },
} as const
