import { IngredientDetails } from '@/features/burger/ui'
import { OnlyAuth, OnlyUnAuth } from '@/shared/lib/router/protected.tsx'
import { RouteObject } from 'react-router'
import { MainLayout } from '@/app/layouts'
import * as Pages from '@/pages'

export type TRouterConfig = RouteObject & {
  modal?: boolean
  children?: TRouterConfig[]
}

export const routesConfig: TRouterConfig[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Pages.ConstructorPage />,
      },
      {
        path: '*',
        element: <Pages.NotFoundPage />,
      },

      {
        path: 'ingredients/:id',
        element: <IngredientDetails />,
        modal: true,
      },

      {
        path: '/login',
        element: (
          <OnlyUnAuth>
            <Pages.Login />
          </OnlyUnAuth>
        ),
        modal: true,
      },
      {
        path: '/register',
        element: (
          <OnlyUnAuth>
            <Pages.Register />
          </OnlyUnAuth>
        ),
        modal: true,
      },
      {
        path: '/forgot-password',
        element: (
          <OnlyUnAuth>
            <Pages.ForgotPassword />
          </OnlyUnAuth>
        ),
        modal: true,
      },
      {
        path: '/reset-password',
        element: (
          <OnlyUnAuth>
            <Pages.ResetPassword />
          </OnlyUnAuth>
        ),
        modal: true,
      },
      {
        path: '/profile',
        element: (
          <OnlyAuth>
            <Pages.Profile />
          </OnlyAuth>
        ),
        children: [
          {
            path: 'orders',
            element: <Pages.NotFoundPage />,
            children: [
              {
                path: ':orderId',
                element: <Pages.NotFoundPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]
