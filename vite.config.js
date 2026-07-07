import { defineConfig } from "vite";
import inject from '@rollup/plugin-inject';
import path from 'path'

export default defineConfig({
  // Show a full-screen error overlay in the browser whenever
  // there is a JavaScript error — students see problems immediately.
  server: {
    overlay: true,
    host: '0.0.0.0',
    port: 5174
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  plugins: [
    inject({
      p5: 'p5',
    }),
  ],
});
