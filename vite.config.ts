import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
        additionalData: `
          @use '@/assets/styles/vars.scss' as *;
          @use '@/assets/styles/mixins.scss' as *;
        `,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@ui-kit': path.resolve(__dirname, 'src/ui-kit'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/setupTests.ts'],
    mockReset: true,
  },
  server: {
    port: 8080,
    host: '0.0.0.0',
  },
})
