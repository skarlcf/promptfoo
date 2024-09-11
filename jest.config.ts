/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
import type { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  coverageDirectory: '.coverage',
  coverageProvider: 'v8',
  extensionsToTreatAsEsm: ['.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist', '<rootDir>/examples', '<rootDir>/node_modules'],
  setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: [
    '.*\\.test\\.tsx$',
    '<rootDir>/dist',
    '<rootDir>/examples',
    '<rootDir>/node_modules',
  ],
  transform: {
    '^.+\\.m?[tj]sx?$': '@swc/jest',
  },
  moduleNameMapper: {
    '^@promptfoo/(.*)$': '<rootDir>/src/$1',
    '^@server/(.*)$': '<rootDir>/src/server/$1',
    '^@app/(.*)$': '<rootDir>/src/web/nextui/src/$1',
  },
};

export default config;
