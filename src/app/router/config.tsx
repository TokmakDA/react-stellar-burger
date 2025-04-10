import { IngredientDetails } from '@/entities/ingredient'
import { ProfileInfo, ProfileOrders } from '@/features/profile'
import { ROUTES } from '@/shared/config'
import { OnlyAuth, OnlyUnAuth } from '@/shared/lib/router'
import { RouteObject } from 'react-router'
import { MainLayout } from '@/app/layouts'
import * as Pages from '@/pages'

export type TRouterConfig = RouteObject & {
  modal?: boolean
  children?: TRouterConfig[]
}

export const routesConfig: TRouterConfig[] = [
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Pages.ConstructorPage />,
      },
      {
        path: ROUTES.INGREDIENT_DETAILS,
        element: <IngredientDetails />,
        modal: true,
      },
      /* Auth */
      {
        path: ROUTES.LOGIN,
        element: (
          <OnlyUnAuth>
            <Pages.Login />
          </OnlyUnAuth>
        ),
        modal: true,
      },
      {
        path: ROUTES.REGISTER,
        element: (
          <OnlyUnAuth>
            <Pages.Register />
          </OnlyUnAuth>
        ),
        modal: true,
      },
      {
        path: ROUTES.FORGOT_PASSWORD,
        element: (
          <OnlyUnAuth>
            <Pages.ForgotPassword />
          </OnlyUnAuth>
        ),
        modal: true,
      },
      {
        path: ROUTES.RESET_PASSWORD,
        element: (
          <OnlyUnAuth>
            <Pages.ResetPassword />
          </OnlyUnAuth>
        ),
        modal: true,
      },

      /* Profile */
      {
        path: ROUTES.PROFILE,
        element: (
          <OnlyAuth>
            <Pages.Profile />
          </OnlyAuth>
        ),
        children: [
          {
            index: true,
            element: <ProfileInfo />,
          },
          {
            path: ROUTES.PROFILE_ORDERS,
            element: <ProfileOrders />,
          },
        ],
      },
      {
        path: ROUTES.PROFILE_ORDER_DETAILS,
        element: (
          <OnlyAuth>
            <Pages.OrderInfo />
          </OnlyAuth>
        ),
        modal: true,
      },

      /* OrderFeed */
      {
        path: ROUTES.ORDER_FEED,
        element: <Pages.OrderFeed />,
      },
      {
        path: ROUTES.ORDER_FEED_DETAILS,
        element: <Pages.OrderInfo />,
        modal: true,
      },

      /* 404 */
      {
        path: ROUTES.NOT_FOUND,
        element: <Pages.NotFoundPage />,
      },
    ],
  },
]
