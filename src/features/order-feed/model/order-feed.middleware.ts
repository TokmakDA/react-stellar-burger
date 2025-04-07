import { socketMiddleware } from '@/shared/lib/ws'

import {
  connect,
  onConnecting,
  onClose,
  onError,
  onOpen,
  onMessage,
  disconnect,
} from './ws.actions.ts'

export const orderFeedMiddleware = socketMiddleware({
  connect,
  disconnect,
  onConnecting,
  onOpen,
  onError,
  onMessage,
  onClose,
})
