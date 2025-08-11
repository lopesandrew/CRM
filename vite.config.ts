// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/CRM/', // <= obrigatório em GitHub Pages (project page)
  plugins: [react()],
})