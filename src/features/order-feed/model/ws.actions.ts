import { createAction } from '@reduxjs/toolkit'
import { TFeedResponse } from './types' // структура WS-ответа

const prefix = 'order-feed'

export const connect = createAction<string, `${typeof prefix}/connect`>(
  `${prefix}/connect`
)
export const disconnect = createAction(`${prefix}/disconnect`)

export const onConnecting = createAction(`${prefix}/connecting`)
export const onOpen = createAction(`${prefix}/open`)
export const onError = createAction<string, `${typeof prefix}/error`>(
  `${prefix}/error`
)
export const onClose = createAction(`${prefix}/close`)
export const onMessage = createAction<
  TFeedResponse,
  `${typeof prefix}/message`
>(`${prefix}/message`)

export type OrderFeedWsActions =
  | ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof onConnecting>
  | ReturnType<typeof onOpen>
  | ReturnType<typeof onError>
  | ReturnType<typeof onClose>
  | ReturnType<typeof onMessage>
