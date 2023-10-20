import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import deckLoader from './src/deck-loader/main';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // multiline
    react(),
    deckLoader(),
  ],
});
