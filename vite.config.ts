import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import { webComponentLoader } from './vite/web-components-loader';

export default defineConfig({
  plugins: [solid(), webComponentLoader()],
});
