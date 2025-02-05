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
          @use '@/assets/styles/typography.scss' as *;
          @use '@/assets/styles/mixins.scss' as *;
        `,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/setupTests.ts'], // добавил расширение, если TypeScript
    mockReset: true,
  },
  server: {
    port: 8080,
    host: '0.0.0.0',
  },
})
