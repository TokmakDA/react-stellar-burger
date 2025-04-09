import { RootState } from '@/app/store.ts'
import { refreshAccessToken } from '@/shared/api'
import { WS_API_BASE_URL } from '@/shared/config'
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
} from '@reduxjs/toolkit'

type WsActions<R, S> = {
  connect: ActionCreatorWithPayload<string>
  disconnect: ActionCreatorWithoutPayload
  onConnecting?: ActionCreatorWithoutPayload
  onOpen?: ActionCreatorWithoutPayload
  onClose?: ActionCreatorWithoutPayload
  onError: ActionCreatorWithPayload<string>
  onMessage: ActionCreatorWithPayload<R>
  sendMessage?: ActionCreatorWithPayload<S>
}

export const RECONNECT_PERIOD = 6000

export const socketMiddleware = <R, S>(
  wsActions: WsActions<R, S>,
  withTokenRefresh: boolean = false
): Middleware<Record<string, never>, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null
    const {
      connect,
      disconnect,
      onConnecting,
      onOpen,
      onClose,
      onError,
      onMessage,
      sendMessage,
    } = wsActions
    const { dispatch } = store
    let isConnected = false
    let reconnectTimer = 0
    let url = ''

    return (next) => {
      return (action) => {
        if (connect.match(action)) {
          url = WS_API_BASE_URL + action.payload
          socket = new WebSocket(url)
          if (onConnecting) {
            dispatch(onConnecting())
          }
          isConnected = true

          socket.onopen = () => {
            if (onOpen) {
              dispatch(onOpen())
            }
          }

          socket.onerror = () => {
            dispatch(onError('Error'))
          }

          socket.onclose = () => {
            if (onClose) {
              dispatch(onClose())
            }

            if (isConnected) {
              reconnectTimer = window.setTimeout(() => {
                dispatch(connect(url))
              }, RECONNECT_PERIOD)
            }
          }

          socket.onmessage = async (event) => {
            const { data } = event

            try {
              const parsedData = JSON.parse(data)

              if (
                withTokenRefresh &&
                parsedData.message === 'Invalid or missing token'
              ) {
                try {
                  const refreshedData = await refreshAccessToken()

                  const wssUrl = new URL(url)
                  wssUrl.searchParams.set(
                    'token',
                    refreshedData.accessToken.replace('Bearer ', '')
                  )

                  dispatch(disconnect()) // закрыть текущее соединение
                  dispatch(connect(wssUrl.toString())) // открыть новое с новым токеном

                  return
                } catch (err) {
                  dispatch(onError((err as Error).message))
                  dispatch(disconnect())
                  return
                }
              }

              dispatch(onMessage(parsedData))
            } catch (error) {
              dispatch(onError((error as Error).message))
            }
          }
        }

        if (socket && sendMessage?.match(action)) {
          try {
            const data = JSON.stringify(action.payload)
            socket.send(data)
          } catch (error) {
            dispatch(onError((error as Error).message))
          }
        }

        if (socket && disconnect.match(action)) {
          clearTimeout(reconnectTimer)
          isConnected = false
          reconnectTimer = 0
          socket.close()
          socket = null
        }

        next(action)
      }
    }
  }
}
