import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: './', // Use relative paths for GitHub Pages compatibility
  plugins: [react()],
})
