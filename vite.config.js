import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/kira-showcase/' : '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('recharts') || id.includes('d3-')) return 'recharts';
          if (id.includes('framer-motion') || id.includes('motion-')) return 'framer';
          if (id.includes('i18next') || id.includes('react-i18next')) return 'i18n';
          if (id.includes('react-router')) return 'router';
          return undefined;
        },
      },
    },
  },
}));
