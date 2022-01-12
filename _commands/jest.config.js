module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    '**/*.{js,ts}',
    '!<rootDir>/*.{js,ts}',
    '!**/{node_modules,coverage,apiDocs,tests,model}/**',
    '!**/index.{js,ts}',
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: `${process.cwd()}/coverage`,

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['json', 'text', 'lcov', 'text-summary'],

  // roots: ['<rootDir>/src'],

  // The root directory that Jest should scan for tests and modules within
  rootDir: process.cwd(),

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // This option allows the use of a custom results processor
  testResultsProcessor: 'jest-sonar-reporter',

  // testMatch: [
  //   '**/__tests__/**/*.+(ts|tsx|js)',
  //   '**/?(*.)+(spec|test).+(ts|tsx|js)',
  // ],

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
