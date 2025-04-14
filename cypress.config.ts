import { defineConfig } from 'cypress'
import * as dotenv from 'dotenv'
dotenv.config()

const baseUrl =
  process.env.VITE_BASE_URL ||
  `http://localhost:${process.env.VITE_PORT || 5173}`

export default defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    baseUrl,
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,ts,jsx,tsx}',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {
      console.log('🚀 Using baseUrl:', baseUrl)
    },
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    specPattern: 'src/**/*.{cy,component}.{ts,tsx}',
  },
})
