import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
 
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    'alias': {
      '@': '/src',
      '@app': '/src/app',
      '@components': '/src/app/Components',
      '@pages': '/src/app/pages',
      '@tests': '/src/__tests__',
    },
  },
})