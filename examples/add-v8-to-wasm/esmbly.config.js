const path = require('path');
const V8Transformer = require('@esmbly/transformer-v8').default;
const WasmTransformer = require('@esmbly/transformer-wasm').default;

const testPath = path.join(__dirname, 'tests');

module.exports = {
  input: ['./src/**/*.js'],
  transformers: [
    V8Transformer({
      testCommand: `jest ${testPath}`
    }),
    WasmTransformer({})
  ],
  output: [
    {
      dir: 'dist',
      format: '.ts',
      flatten: true
    },
  ],
};
