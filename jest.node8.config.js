module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/e2e/add-flow-to-wasm.test.ts',
    '<rootDir>/e2e/add-jsdoc-to-wasm.test.ts',
    '<rootDir>/e2e/custom-transformer.test.ts',
    '<rootDir>/e2e/game-of-life.test.ts',
    '<rootDir>/e2e/insertion-sort.test.ts',
    '<rootDir>/e2e/lockfile.test.ts',
    '<rootDir>/e2e/lodash.test.ts',
    '<rootDir>/e2e/ms.test.ts',
    '<rootDir>/e2e/pad.test.ts',
  ],
};
