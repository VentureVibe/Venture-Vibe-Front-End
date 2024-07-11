import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      ...NodeGlobalsPolyfillPlugin({
        buffer: true,
        process: true,
      }),
      apply: 'build',
    },
    {
      ...NodeGlobalsPolyfillPlugin(),
      apply: 'build',
    },
  ],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  server: {
    hmr: {
      overlay: false
    }
  }
})
