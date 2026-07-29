import { defineConfig } from 'vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import graphPlugin from './app/vite-plugin-graph.js'

const projectRoot = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root:  'app',
  base:  '/the-compilerium/',
  plugins: [
    graphPlugin({
      rootDir: projectRoot,
      outDir:  path.join(projectRoot, 'app/public'),
    }),
  ],
  build: {
    outDir:      '../dist',
    emptyOutDir: true,
  },
})
