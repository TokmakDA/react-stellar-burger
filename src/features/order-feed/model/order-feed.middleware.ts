import { socketMiddleware } from '@/shared/lib/ws'

import { orderFeedActions } from './ws.actions.ts'

export const orderFeedMiddleware = socketMiddleware({
  ...orderFeedActions,
})
