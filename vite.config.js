import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main:           resolve(__dirname, 'index.html'),
        menu:           resolve(__dirname, 'menu.html'),
        artikel:        resolve(__dirname, 'artikel.html'),
        artikelDetail:  resolve(__dirname, 'artikel-detail.html'),
      },
    },
  },
});
