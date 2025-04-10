import { socketMiddleware } from '@/shared/lib/ws'

import { profileOrderActions } from './ws.actions.ts'

export const profileOrdersMiddleware = socketMiddleware(
  {
    ...profileOrderActions,
  },
  true
)
