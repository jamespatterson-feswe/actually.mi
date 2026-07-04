/** @type {import('jest').Config} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/lib/env.ts',
    '!src/lib/prisma.ts',
    '!src/lib/rate-limiter.ts',
    '!src/lib/sanitizer.ts',
    '!src/index.ts',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: ['node_modules/(?!(jsdom|dompurify|@exodus)/)'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  forceExit: true,
};
