import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import deckLoader from './src/deck-loader/main';

export default defineConfig({
  plugins: [solid(), deckLoader()],
});
