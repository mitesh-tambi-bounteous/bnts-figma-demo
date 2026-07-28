import { defineConfig } from '@playwright/test'

/** The viewport IS the Figma frame, so boundingBox coordinates are frame coordinates. */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3001',
    viewport: { width: 390, height: 1461 },
    deviceScaleFactor: 2,
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3001',
    reuseExistingServer: !process.env.CI,
  },
})
