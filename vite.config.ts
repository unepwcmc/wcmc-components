import { fileURLToPath, URL } from 'url'
import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import libCss from 'vite-plugin-libcss'
import typescript2 from 'rollup-plugin-typescript2'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    libCss(), // To make css auto import when using in another project
    dts()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url))
    },
    preserveSymlinks: true
  },
  build: {
    cssCodeSplit: false,
    lib: {
      entry: './src/wcmc-components-entry.ts',
      formats: ['es', 'cjs', 'umd'],
      name: 'wcmc-components',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that should not be bundled
      // into your library
      input: {
        main: path.resolve(__dirname, 'src/wcmc-components-entry.ts')
      },
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/imports.scss";'
      }
    }
  }
})
