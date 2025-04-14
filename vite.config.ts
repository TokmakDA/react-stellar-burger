import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          additionalData: `
          @use '@/shared/styles/vars.scss' as *;
          @use '@/shared/styles/mixins.scss' as *;
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
      setupFiles: './src/shared/config/test/vitest-setup.ts',
      mockReset: true,
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
    },
    server: {
      port: parseInt(env.VITE_PORT || '5173'),
      host: '0.0.0.0',
    },
  }
})
