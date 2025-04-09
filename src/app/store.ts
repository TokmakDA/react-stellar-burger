import { rootReducer } from '@/app/root-reducer'
import { ingredientsApi } from '@/entities/ingredient'
import { orderAcceptedApi } from '@/entities/order-accepted'
import { userApi } from '@/entities/user'
import { authApi } from '@/features/auth'
import { orderFeedMiddleware } from '@/features/order-feed'
import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(
        ingredientsApi.middleware,
        orderAcceptedApi.middleware,
        authApi.middleware,
        userApi.middleware,
        orderFeedMiddleware
      )
    },
    preloadedState,
  })

  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

export type AppStore = typeof store
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
