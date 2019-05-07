const path = require('path');
const JSDoc = require('@esmbly/transformer-jsdoc');
const Wasm = require('@esmbly/transformer-wasm');

module.exports = {
  input: ['./src/**/*.js'],
  transformers: [
    JSDoc.createTransformer({}),
    Wasm.createTransformer({
      memory: { export: true, allocator: 'allocator/tlsf' },
    }),
  ],
  output: [
    {
      format: '.wasm',
      outFile: path.join(__dirname, 'dist', 'sort.wasm'),
    },
  ],
};
