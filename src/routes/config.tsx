import type { RouteObject } from 'react-router-dom'
import { MainLayout } from '@/layouts'
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
