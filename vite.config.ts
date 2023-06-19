import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import express from 'vite3-plugin-express'
import { config } from 'dotenv'
config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), express('src/backend')],
})
