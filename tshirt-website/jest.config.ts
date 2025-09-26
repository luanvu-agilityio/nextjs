import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }],
  },
  testEnvironment: 'jsdom',
  coverageProvider: 'v8',
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!<rootDir>/src/**/*.stories.{js,jsx,ts,tsx}',
    // '!<rootDir>/src/constants/*',
    // '!<rootDir>/src/interfaces/*',
    // '!<rootDir>/src/layouts/*',
    // '!<rootDir>/src/mocks/*',
    // '!<rootDir>/src/enums/*',
    // '!<rootDir>/src/lib/**',
    // '!<rootDir>/src/stores/**',
    // '!<rootDir>/node_modules/',
    // '!<rootDir>/src/app/**/*',
    // '!<rootDir>/src/middleware.ts',
    // '!<rootDir>/src/icons/*',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/index.ts$'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
