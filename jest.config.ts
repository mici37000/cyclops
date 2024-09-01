import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  roots: ['<rootDir>/src'],
  testPathIgnorePatterns: [],
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: '<rootDir>/reports/coverage',
  coverageProvider: 'v8',
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Test Report',
        outputPath: '<rootDir>/reports/testResultsProcessorResult.html',
        includeFailureMsg: true,
        includeConsoleLog: true,
        append: false,
        sort: 'status'
      }
    ]
  ]
};

// Don't set setupFilesAfterEnv in case of running from ng cli (ng test)
if (process.argv.some((item) => item.includes('.bin/jest'))) {
  config.setupFilesAfterEnv = ['<rootDir>/test-setup/setup.ts'];
}

export default config;
