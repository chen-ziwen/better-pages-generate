import { defineConfig } from 'tsup'

export default defineConfig([
  {
    // 主要的库文件构建配置
    entry: [
      'src/core.ts',           // 核心工具函数
      'src/index.tsx',         // 主入口文件（非懒加载版本）
      'src/index-lazy.tsx',    // 懒加载版本入口文件
      'src/react-router.tsx',  // React Router 集成（非懒加载）
      'src/react-router-lazy.tsx', // React Router 集成（懒加载）
    ],
    format: ['esm'],           // 输出 ES 模块格式
    dts: true,                 // 自动生成 TypeScript 声明文件
    minify: false,             // 禁用代码混淆和压缩，保持代码可读性
    external: [                // 外部依赖，不打包到最终文件中
      'react',
      'react-router',
      'react/jsx-runtime',     // React JSX 运行时
    ],
    noExternal: [              // 强制打包的依赖
      'better-pages-generate', // 核心包的代码需要被打包
    ],
    splitting: false,          // 禁用代码分割，确保每个入口都是独立的
    clean: true,              // 构建前清理输出目录
  },
  {
    // Vite 插件构建配置
    entry: ['src/plugin/index.ts'],
    outDir: 'dist/plugin',
    format: ['cjs', 'esm'],    // 插件需要支持 CommonJS 和 ES 模块
    dts: true,                 // 生成类型定义文件
    minify: false,             // 禁用代码混淆和压缩，保持代码可读性
    external: [                // 插件的外部依赖
      'vite',
      'fast-glob',
      'path',
      'fs',
    ],
    clean: false,              // 不清理，避免与主构建冲突
  },
])
