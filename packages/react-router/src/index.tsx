import { Fragment, JSX, Suspense } from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router'
import type { ActionFunction, RouteObject, LoaderFunction } from 'react-router'

import { generatePreservedRoutes, generateRegularRoutes } from './core'

type Element = () => JSX.Element
type Module = {
  default: Element
  Loader?: LoaderFunction
  Action?: ActionFunction
  Catch?: Element
  Pending?: Element
  Handle: any
}

const PRESERVED = import.meta.glob<Module>('/src/pages/(_app|404).{jsx,tsx}', { eager: true })
const ROUTES = import.meta.glob<Module>(
  ['/src/pages/**/[\\w[-]*.{jsx,tsx}', '!/src/pages/**/(_!(layout)*(/*)?|_app|404)*'],
  { eager: true },
)

const preservedRoutes = generatePreservedRoutes<Omit<Module, 'Action'>>(PRESERVED)

const regularRoutes = generateRegularRoutes<RouteObject, Partial<Module>>(ROUTES, (module, key) => {
  const index = /index\.(jsx|tsx|mdx)$/.test(key) && !key.includes('pages/index') ? { index: true } : {}
  const Default = module?.default || (() => <Fragment />)
  const Page = () => (module?.Pending ? <Suspense fallback={<module.Pending />} children={<Default />} /> : <Default />)
  return {
    ...index,
    Component: Page,
    ErrorBoundary: module?.Catch,
    loader: module?.Loader,
    action: module?.Action,
    handle: module?.Handle,
  }
})

const _app = preservedRoutes?.['_app']
const _404 = preservedRoutes?.['404']

const Default = _app?.default || Outlet

const Layout = () => <Default />

const App = () => (_app?.Pending ? <Suspense fallback={<_app.Pending />} children={<Layout />} /> : <Layout />)

const app = { Component: _app?.default ? App : Layout, ErrorBoundary: _app?.Catch, loader: _app?.Loader }
const fallback = { path: '*', Component: _404?.default || (() => <Fragment />) }

export const routes: RouteObject[] = [{ ...app, children: [...regularRoutes, fallback] }]
let router: ReturnType<typeof createBrowserRouter>
const createRouter = () => ((router ??= createBrowserRouter(routes)), router)
export const Routes = () => <RouterProvider router={createRouter()} />
