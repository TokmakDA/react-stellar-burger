import { routesConfig, TRouterConfig } from '@/app/router/config.tsx'
import { Modal } from '@/shared/ui'
import { Route, Routes, useLocation } from 'react-router'

export function Router() {
  const location = useLocation()

  const background = location.state?.background
  const initialPath = location.state?.initialPath

  //  Рекурсивная генерация маршрутов
  const generateRoutes = (routes: TRouterConfig[]) =>
    routes.map((route) =>
      route.index ? (
        <Route key='index' index element={route.element} />
      ) : (
        <Route key={route.path} path={route.path} element={route.element}>
          {route.children && generateRoutes(route.children)}
        </Route>
      )
    )

  // Ищем ВСЕ маршруты, у которых modal: true
  const getModalRoutes = (routes: TRouterConfig[]): TRouterConfig[] =>
    routes.flatMap((route) => [
      ...(route.modal ? [route] : []),
      ...(route.children ? getModalRoutes(route.children) : []),
    ])

  const generateModalsRoutes = (routes: TRouterConfig[]) =>
    routes.map((route) =>
      route.index ? (
        <Route key='index' index element={<Modal>{route.element}</Modal>} />
      ) : (
        <Route
          key={route.path}
          path={route.path}
          element={<Modal>{route.element}</Modal>}
        >
          {route.children && generateRoutes(route.children)}
        </Route>
      )
    )

  const modalRoutes = getModalRoutes(routesConfig)

  return (
    <>
      <Routes
        location={
          (background && { ...background, pathname: initialPath }) || location
        }
      >
        {generateRoutes(routesConfig)}
      </Routes>

      {background && <Routes>{generateModalsRoutes(modalRoutes)}</Routes>}
    </>
  )
}
