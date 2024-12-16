import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

module.exports = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
