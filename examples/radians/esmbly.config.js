const path = require('path');
const V8Transformer = require('@esmbly/transformer-v8').default;
const WasmTransformer = require('@esmbly/transformer-wasm').default;

const testPath = path.join(__dirname, 'test');
const configPath = path.join(__dirname, 'jest.config.js')

module.exports = {
  input: ['./src/**/*.js'],
  transformers: [
    V8Transformer({
      testCommand: `jest ${testPath} --config=${configPath} --runInBand`
    }),
    WasmTransformer(),
  ],
  output: [
    {
      dir: 'dist',
      format: '.wasm',
      filename: 'radians.wasm',
      flatten: true
    },
  ],
};
