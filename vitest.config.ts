import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./src/core/tests/mocks/index.ts'],
  },
});
