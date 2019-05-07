module.exports = {
  collectCoverageFrom: [
    '<rootDir>/packages/**/src/**/*.ts',
    '!<rootDir>/packages/**/src/dist/**/*.ts',
  ],
  coverageDirectory: '<rootDir>/coverage',
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/packages/**/**.test.(ts)', '!**/__fixtures__/**'],
};
