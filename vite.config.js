import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Mood-adjustment/',
  plugins: [
    tailwindcss(),
  ],
})