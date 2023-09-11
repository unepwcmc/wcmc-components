import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import libCss from 'vite-plugin-libcss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    libCss() // To make css auto import when using in another project
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url))
    }
  },
  build: {
    cssCodeSplit: false,
    lib: {
      entry: './src/FilterableTable.ts',
      formats: ['es', 'cjs'],
      name: 'FilterableTable',
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs')
    },
    rollupOptions: {
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
