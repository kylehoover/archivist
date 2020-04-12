const { resolve } = require('path')

module.exports = {
  globalSetup: resolve('./node_modules/@shelf/jest-mongodb/setup.js'),
  globalTeardown: resolve('./node_modules/@shelf/jest-mongodb/teardown.js'),
  preset: 'ts-jest',
  testEnvironment: resolve('./node_modules/@shelf/jest-mongodb/environment.js'),
  testMatch: [
    '<rootDir>/server/**/*.test.ts'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/client/'
  ]
}
