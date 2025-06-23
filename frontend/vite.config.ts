import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    css: true,
    setupFiles: './src/setupTests.ts',
  },
})
