const path = require('path');
const V8 = require('@esmbly/transformer-v8');
const Wasm = require('@esmbly/transformer-wasm');

const testPath = path.join(__dirname, 'tests');
const configPath = path.join(__dirname, 'jest.config.js');

module.exports = {
  input: ['./src/**/*.js'],
  transformers: [
    V8.createTransformer({
      testCommand: `jest ${testPath} --config=${configPath}`,
    }),
    Wasm.createTransformer({}),
  ],
  output: [
    {
      dir: 'dist',
      format: '.ts',
      flatten: true,
    },
    {
      dir: 'dist',
      format: '.wat',
      filename: 'add.wat',
      flatten: true,
    },
    {
      dir: 'dist',
      format: '.wasm',
      filename: 'add.wasm',
      flatten: true,
    },
    {
      dir: 'dist',
      format: '.as',
      filename: '[name].as.ts',
      flatten: true,
    },
  ],
};
