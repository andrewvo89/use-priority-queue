/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html'],
      include: ['src/**'],
    },
    environment: 'jsdom',
  },
});
