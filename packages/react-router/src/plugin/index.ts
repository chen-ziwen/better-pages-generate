import type { Plugin } from 'vite'
import * as path from 'path'
import * as fs from 'fs'
import fg from 'fast-glob'

export interface PluginOptions {
  /**
   * 路由文件夹路径，默认为 'src/pages'
   */
  routesDir?: string
  /**
   * 文件扩展名，默认为 ['jsx', 'tsx', 'mdx']
   */
  extensions?: string[]
  /**
   * 扩展单个路由的函数
   */
  extendRoute?: (route: any, filePath: string) => any | void
  /**
   * 处理生成的所有路由的函数
   */
  onRoutesGenerated?: (routes: any[]) => any[] | void
  /**
   * 路由模式：'eager' 为非懒加载，'lazy' 为懒加载，默认为 'lazy'
   */
  mode?: 'eager' | 'lazy'
  /**
   * 是否生成完整的路由器配置，默认为 true
   */
  generateRouter?: boolean
}

export function betterPagesPlugin(options: PluginOptions = {}): Plugin {
  const {
    routesDir = 'src/pages',
    extensions = ['jsx', 'tsx', 'mdx'],
    mode = 'lazy',
    generateRouter = true,
    extendRoute,
    onRoutesGenerated
  } = options

  let root: string
  const VIRTUAL_MODULE_ID = '~pages'
  const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID

  return {
    name: 'better-pages-generate',
    configResolved(config) {
      root = config.root
    },
    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID
      }
    },
    async load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        // return await generateRouteContent()
      }
    },
    async handleHotUpdate({ file, server }) {
      const pagesDir = path.resolve(root, routesDir)

      if (file.startsWith(pagesDir)) {
        const module = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID)
        if (module) {
          server.reloadModule(module)
        }
      }
    }
  }
}

export default betterPagesPlugin
