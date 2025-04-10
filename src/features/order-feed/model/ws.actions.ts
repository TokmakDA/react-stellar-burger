import { createWsActions } from '@/shared/lib/ws/create-ws-actions'
import { TOrdersResponse } from '@/shared/types'

export const { actions: orderFeedActions } = createWsActions<
  TOrdersResponse,
  'order-feed'
>('order-feed')

export type OrderFeedWsActions = typeof orderFeedActions
