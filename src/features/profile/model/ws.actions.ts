import { createWsActions } from '@/shared/lib/ws/create-ws-actions'
import { TOrdersResponse } from '@/shared/types'

export const { actions: profileOrderActions } = createWsActions<
  TOrdersResponse,
  'profile-orders'
>('profile-orders')

export type ProfileOrdersWsActions = typeof profileOrderActions
