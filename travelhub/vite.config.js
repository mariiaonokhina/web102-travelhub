import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/web102-travelhub/', 
  plugins: [react()],
})
