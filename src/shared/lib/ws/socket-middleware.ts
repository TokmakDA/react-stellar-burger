import { RootState } from '@/app/store.ts'
import { refreshAccessToken } from '@/shared/api'
import { WS_API_BASE_URL } from '@/shared/config'
import { TConnectPayload } from '@/shared/lib/ws/types.ts'
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
} from '@reduxjs/toolkit'

type WsActions<R, S> = {
  connect: ActionCreatorWithPayload<TConnectPayload>
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
    let lastPayload: TConnectPayload | null = null

    return (next) => (action) => {
      if (connect.match(action)) {
        if (socket) {
          console.debug('[WS] Already connected, ignoring connect')
          return
        }
        lastPayload = action.payload

        const wssUrl = new URL(WS_API_BASE_URL + action.payload.url)
        if (withTokenRefresh && action.payload.token) {
          wssUrl.searchParams.set('token', action.payload.token)
        }

        socket = new WebSocket(wssUrl)
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
          dispatch(onError('WebSocket error'))
        }

        socket.onclose = () => {
          if (onClose) {
            dispatch(onClose())
          }

          if (isConnected && lastPayload) {
            reconnectTimer = window.setTimeout(() => {
              dispatch(connect(lastPayload!))
            }, RECONNECT_PERIOD)
          }
        }

        socket.onmessage = async (event) => {
          try {
            const parsedData = JSON.parse(event.data)

            if (
              withTokenRefresh &&
              parsedData.message === 'Invalid or missing token'
            ) {
              try {
                const refreshedData = await refreshAccessToken()

                const newPayload: TConnectPayload = {
                  url: action.payload.url,
                  token: refreshedData.accessToken.replace('Bearer ', ''),
                }

                dispatch(disconnect())
                dispatch(connect(newPayload))
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
