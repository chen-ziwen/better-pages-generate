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

const PRESERVED = import.meta.glob<Module>('/src/pages/*.{jsx,tsx}', { eager: true })
const ROUTES = import.meta.glob<Module>(['/src/pages/**/[\\w[-]*.{jsx,tsx}', '!/src/pages/**/(_!(layout)*(/*)?|404)*'])

const preservedRoutes = generatePreservedRoutes<Omit<Module, 'Action'>>(PRESERVED)

const regularRoutes = generateRegularRoutes<RouteObject, () => Promise<Partial<Module>>>(ROUTES, (module, key) => {
  const index = /index\.(jsx|tsx|mdx)$/.test(key) && !key.includes('pages/index') ? { index: true } : {}

  return {
    ...index,
    lazy: async () => {
      const Default = (await module())?.default || (() => <Fragment />)
      const Pending = (await module())?.Pending
      const Page = () => (Pending ? <Suspense fallback={<Pending />} children={<Default />} /> : <Default />)

      return {
        Component: Page,
        ErrorBoundary: (await module())?.Catch,
        loader: (await module())?.Loader,
        action: (await module())?.Action,
        handle: (await module())?.Handle,
      }
    },
  }
})

const _404 = preservedRoutes?.['404']

const fallback = { path: '*', Component: _404?.default || (() => <Fragment />) }

export const routes: RouteObject[] = [...regularRoutes, fallback]
let router: ReturnType<typeof createBrowserRouter>
const createRouter = () => ((router ??= createBrowserRouter(routes)), router)
export const Routes = () => <RouterProvider router={createRouter()} />
