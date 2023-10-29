import preact from '@preact/preset-vite';
import { defineConfig } from 'vite';
import deckLoader from './src/deck-loader/main';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // multiline
    preact(),
    deckLoader(),
  ],
});
