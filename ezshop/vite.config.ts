import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Ensure this matches your build output directory
    sourcemap: true, // Optional: Enable sourcemaps for debugging
  },
});