import { routesConfig, TRouterConfig } from '@/app/router/config.tsx'
import { useBackgroundLocation } from '@/shared/lib/hooks'
import { FullPage, Modal } from '@/shared/ui'
import { useCallback, useMemo } from 'react'
import { Route, Routes } from 'react-router'

export function Router() {
  const { location, background } = useBackgroundLocation()

  const generateRoutes = (routes: TRouterConfig[], isModal = false) =>
    routes.map((route) => {
      const element = isModal ? (
        <Modal>{route.element}</Modal>
      ) : route.modal ? (
        <FullPage>{route.element}</FullPage>
      ) : (
        route.element
      )

      return route.index ? (
        <Route key='index' index element={element} />
      ) : (
        <Route key={route.path} path={route.path} element={element}>
          {route.children && generateRoutes(route.children, isModal)}
        </Route>
      )
    })

  const getModalRoutes = useCallback(
    (
      routes: TRouterConfig[],
      parent: TRouterConfig | undefined = undefined
    ): TRouterConfig[] =>
      routes.reduce((acc: TRouterConfig[], route) => {
        if (route.modal) {
          let path = route.path
          if (path && !path?.startsWith('/')) {
            const parentPath = parent?.path || '/'
            path = path?.startsWith('/')
              ? parentPath
              : parentPath + '/' + route.path
          }

          acc.push({
            ...route,
            path: path,
          })
        }
        if (route.children) {
          const children = getModalRoutes(route.children, route)
          if (children.length > 0) {
            acc.push(...children)
          }
        }
        return acc
      }, []),
    []
  )

  const modalRoutes = useMemo(
    () => getModalRoutes(routesConfig),
    [getModalRoutes]
  )

  return (
    <>
      <Routes location={background ? { ...background } : location}>
        {generateRoutes(routesConfig)}
      </Routes>

      {background && <Routes>{generateRoutes(modalRoutes, true)}</Routes>}
    </>
  )
}
