import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/core.ts', 'src/index*'],
    format: ['esm'],
    dts: {
      entry: {
        core: './node_modules/better-pages-generate/dist/core.d.ts',
        index: './node_modules/better-pages-generate/dist/react-router.d.ts',
        'index-lazy': './node_modules/better-pages-generate/dist/react-router-lazy.d.ts',
      },
    },
    external: ['react', 'react-router'],
    noExternal: ['better-pages-generate'],
  },
  {
    entry: ['src/plugin'],
    outDir: 'dist/plugin',
    format: ['cjs', 'esm'],
    dts: { entry: 'src/plugin/index.ts' },
  },
])
