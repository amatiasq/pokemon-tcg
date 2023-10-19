import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import deckLoader from './src/data/deckLoader';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), deckLoader()],
});
