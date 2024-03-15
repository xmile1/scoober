import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT ?? 7000
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  test: {
    alias: {
      '@': '/src',
    },
    globals: true,
    setupFiles: ['./src/vitest-setup.ts'],
    environment: 'jsdom',
    testEnvironment: 'jsdom',
  },
})
