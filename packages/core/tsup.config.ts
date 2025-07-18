import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/core.ts'],
    format: ['esm'],
    dts: true,
    outDir: 'dist',
    clean: true,
    minify: false,
  },
])

