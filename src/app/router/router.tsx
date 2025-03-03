import { routesConfig, TRouterConfig } from '@/app/router/config.tsx'
import { FullPage, Modal } from '@/shared/ui'
import { useCallback, useMemo } from 'react'
import { Route, Routes, useLocation } from 'react-router'

export function Router() {
  const location = useLocation()

  const background = location.state?.background
  const initialPath = location.state?.initialPath

  const generateRoutes = useCallback(
    (routes: TRouterConfig[]) => routes.map((route) => generateRoute(route)),
    []
  )

  const generateModalsRoutes = useCallback(
    (routes: TRouterConfig[]) =>
      routes.map((route) => generateModalRoute(route)),
    []
  )

  const generateRoute = useCallback(
    (route: TRouterConfig) => {
      const element = route?.modal ? (
        <FullPage>{route.element}</FullPage>
      ) : (
        route.element
      )

      return route.index ? (
        <Route key='index' index element={element} />
      ) : (
        <Route key={route.path} path={route.path} element={element}>
          {route.children && generateRoutes(route.children)}
        </Route>
      )
    },
    [generateRoutes]
  )

  const generateModalRoute = useCallback(
    (route: TRouterConfig) => {
      return route.index ? (
        <Route key='index' index element={<Modal>{route.element}</Modal>} />
      ) : (
        <Route
          key={route.path}
          path={route.path}
          element={<Modal>{route.element}</Modal>}
        >
          {route.children && generateModalsRoutes(route.children)}
        </Route>
      )
    },
    [generateModalsRoutes]
  )

  const getModalRoutes = (
    routes: TRouterConfig[],
    parent: TRouterConfig | undefined = undefined
  ): TRouterConfig[] =>
    routes.reduce((acc: TRouterConfig[], route) => {
      if (route.modal) {
        const path = parent?.path || '/'
        const parentPath = path.at(-1) === '/' ? path : path + '/'

        acc.push({
          ...route,
          path: parentPath + route.path,
        })
      }
      if (route.children) {
        const children = getModalRoutes(route.children, route)
        if (children.length > 0) {
          acc.push(...children)
        }
      }
      return acc
    }, [])

  const modalRoutes = useMemo(
    () => getModalRoutes(routesConfig),
    [routesConfig]
  )

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
