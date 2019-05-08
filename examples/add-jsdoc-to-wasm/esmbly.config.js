const path = require('path');
const JSDoc = require('@esmbly/transformer-jsdoc');
const Wasm = require('@esmbly/transformer-wasm');

module.exports = {
  input: ['./src/**/*.js'],
  transformers: [
    JSDoc.createTransformer(),
    Wasm.createTransformer(),
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
