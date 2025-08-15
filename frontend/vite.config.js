import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // penting untuk path asset relatif
  build: {
    outDir: 'dist'
  }
})

