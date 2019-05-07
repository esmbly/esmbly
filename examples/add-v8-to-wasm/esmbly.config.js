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
      format: '.ts',
      outFile: path.join(__dirname, 'dist', 'add.ts'),
    },
    {
      format: '.wat',
      outFile: path.join(__dirname, 'dist', 'add.wat'),
    },
    {
      format: '.wasm',
      outFile: path.join(__dirname, 'dist', 'add.wasm'),
    },
    {
      format: '.as',
      outFile: path.join(__dirname, 'dist', 'add.as.ts'),
    }
  ],
};
