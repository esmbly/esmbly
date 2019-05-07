const path = require('path');
const V8 = require('@esmbly/transformer-v8');
const Wasm = require('@esmbly/transformer-wasm');

const testPath = path.join(__dirname, 'test');
const configPath = path.join(__dirname, 'jest.config.js');

module.exports = {
  input: ['./src/**/*.js'],
  transformers: [
    V8.createTransformer({
      testCommand: `jest ${testPath} --config=${configPath} --runInBand`,
    }),
    Wasm.createTransformer(),
  ],
  output: [
    {
      dir: 'dist',
      format: '.wasm',
      filename: 'radians.wasm',
      flatten: true,
    },
  ],
};
