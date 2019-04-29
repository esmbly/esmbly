const path = require('path');
const V8Transformer = require('@esmbly/transformer-v8').default;
const WasmTransformer = require('@esmbly/transformer-wasm').default;

const testPath = path.join(__dirname, 'tests');
const configPath = path.join(__dirname, 'jest.config.js')

module.exports = {
  input: ['./src/**/*.js'],
  transformers: [
    V8Transformer({
      testCommand: `jest ${testPath} --config=${configPath}`
    }),
    WasmTransformer({})
  ],
  output: [
    {
      dir: 'dist',
      format: '.ts',
      flatten: true
    },
    {
      dir: 'dist',
      format: '.wasm',
      filename: 'add.wasm',
      flatten: true
    },
    {
      dir: 'dist',
      format: '.as',
      filename: '[name].as.ts',
      flatten: true
    },
  ],
};
