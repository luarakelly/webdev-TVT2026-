import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // The "base" tells Vite where your app will be hosted in production.
  // By default, apps assume they are served from the root ("/"),
  // Example production URL:
  // https://users.metropolia.fi/~your-username/routing/
  //
  // Without this, asset paths (JS, CSS, images) would break because
  // they would try to load from "/" instead of the correct folder.

  base: '/~luaram/webdev_week4/04-hooks/',
});
