import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base matches the GitHub Pages project path: njsuthe.github.io/GhGlabeling/
export default defineConfig({
  base: '/GhGlabeling/',
  plugins: [react()],
})
