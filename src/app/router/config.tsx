import { IngredientDetails } from '@/features/burger/ui'
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
    ],
  },
]
