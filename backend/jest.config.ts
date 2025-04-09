module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/__mocks__/**',
    '!src/**/__tests__/**',
    '!**/*.test.ts',
    '!src/index.ts',
    '!src/app.ts',
  ],
  coverageDirectory: 'coverage', 
  coverageReporters: ['text', 'lcov'],
};
