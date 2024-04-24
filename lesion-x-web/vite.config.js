import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://aws.amazon.com/marketplace/ai-inference/model-evaluation-inference/image-classification?productId=e8fe22a1-fa8e-4eea-babf-a6d4dec53a44',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
