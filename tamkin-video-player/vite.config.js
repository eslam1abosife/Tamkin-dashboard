import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'TamkinVideoPlayer',
      fileName:'tamkin-video-player',
      formats: ["es", "umd"], // Remove "cjs" if not explicitly needed
    },
    rollupOptions: {
      external: ['vue','vue3-lottie'],
      output: {
        globals: {
          vue: 'Vue',
        },
        exports: 'named', 
      },
    },
  },
});
