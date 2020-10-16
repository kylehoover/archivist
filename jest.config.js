module.exports = {
  // automock: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/server/**/*.test.ts'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/client/'
  ]
}
