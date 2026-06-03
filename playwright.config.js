// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  
  /* Timeout untuk setiap test (default: 30 detik) */
  timeout: process.env.CI ? 60000 : 30000, // 60 detik di CI, 30 detik di local
  
  /* Global timeout untuk seluruh test suite */
  globalTimeout: process.env.CI ? 900000 : undefined, // 15 menit di CI
  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results.json' }],
    ['line'] // Output yang lebih jelas di console
  ],
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* 🔥 INI YANG PALING PENTING - Base URL untuk saucedemo */
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    
    /* Screenshot on failure */
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true,
    },
    
    /* Video recording on failure (berguna untuk debug CI) */
    video: process.env.CI ? 'on-first-retry' : 'off',
    
    /* Tambahan timeout untuk action individual */
    actionTimeout: 15000, // 15 detik per action
    navigationTimeout: 30000, // 30 detik untuk navigasi
    
    /* Ignore HTTPS errors (just in case) */
    ignoreHTTPSErrors: true,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Opsi tambahan untuk CI
        launchOptions: {
          args: process.env.CI ? [
            '--disable-dev-shm-usage', // Mengatasi memory limit di Docker
            '--no-sandbox', // Diperlukan untuk Docker container
            '--disable-setuid-sandbox',
          ] : [],
        },
      },
    },

    // Uncomment jika perlu test di browser lain
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});