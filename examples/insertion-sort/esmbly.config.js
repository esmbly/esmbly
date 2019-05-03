const path = require('path');
const JSDocTransformer = require('@esmbly/transformer-jsdoc').default;
const WasmTransformer = require('@esmbly/transformer-wasm').default;

module.exports = {
  input: ['./src/**/*.js'],
  transformers: [
    JSDocTransformer({}),
    WasmTransformer({ memory: { export: true, allocator: 'allocator/tlsf' } }),
  ],
  output: [
    {
      dir: 'dist',
      format: '.wasm',
      filename: 'sort.wasm',
      flatten: true,
    },
  ],
};
