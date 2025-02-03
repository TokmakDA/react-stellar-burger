import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import sass from "sass"
import * as path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
        additionalData: `
                    @use '@/assets/styles/vars.scss' as *;
                    @use '@/assets/styles/mixins.scss' as *;
                    @use '@/assets/styles/typography.scss' as *;
                `,
        silenceDeprecations: ["legacy-js-api"],
        implementation: sass,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})
