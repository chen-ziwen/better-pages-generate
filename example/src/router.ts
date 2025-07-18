import { createBrowserRouter, RouteObject } from 'react-router'
import { routes } from '@better-pages-generate/react-router'

const router = createBrowserRouter(routes as RouteObject[])

console.log('router ===>', router)

export default router
