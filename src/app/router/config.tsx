import type { RouteObject } from 'react-router'
import { MainLayout } from '@/app/layouts'
import * as Pages from '@/pages'

export const routesConfig: RouteObject[] = [
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
    ],
  },
]
