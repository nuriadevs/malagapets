import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Cambiar a ruta relativa desde este archivo
  timeout: 15000,
  use: {
    baseURL: 'http://localhost:3000',
    headless: false,
    launchOptions: {
      slowMo: 500, // Añade delay entre acciones
    },
    viewport: { width: 1280, height: 720 }
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});