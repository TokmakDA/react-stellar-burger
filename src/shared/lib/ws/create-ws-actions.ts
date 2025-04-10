import { TConnectPayload } from '@/shared/lib/ws/types.ts'
import { createAction } from '@reduxjs/toolkit'

export const createWsActions = <TResponse, Prefix extends string>(
  prefix: Prefix
) => {
  const connect = createAction<TConnectPayload, `${Prefix}/connect`>(
    `${prefix}/connect`
  )
  const disconnect = createAction(`${prefix}/disconnect`)

  const onConnecting = createAction(`${prefix}/connecting`)
  const onOpen = createAction(`${prefix}/open`)
  const onError = createAction<string, `${Prefix}/error`>(`${prefix}/error`)
  const onClose = createAction(`${prefix}/close`)
  const onMessage = createAction<TResponse, `${Prefix}/message`>(
    `${prefix}/message`
  )

  const actions = {
    connect,
    disconnect,
    onConnecting,
    onOpen,
    onError,
    onClose,
    onMessage,
  }

  type WsActions =
    | ReturnType<typeof connect>
    | ReturnType<typeof disconnect>
    | ReturnType<typeof onConnecting>
    | ReturnType<typeof onOpen>
    | ReturnType<typeof onError>
    | ReturnType<typeof onClose>
    | ReturnType<typeof onMessage>

  return { actions, typeUnion: null as unknown as WsActions }
}
