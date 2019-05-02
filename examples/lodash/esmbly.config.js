const path = require('path');
const JSDocTransformer = require('@esmbly/transformer-jsdoc').default;
const WasmTransformer = require('@esmbly/transformer-wasm').default;

// TODO: Merge this into one config once output formats has been improved
// TODO: Transform some additional methods to WebAssembly as well
module.exports = [
  {
    input: ['./src/**/*.js', '!./src/internal/**/*.js'],
    transformers: [
      JSDocTransformer({}),
    ],
    output: [
      {
        dir: 'dist',
        format: '.ts',
        flatten: true,
      },
    ],
  },
  {
    input: ['./src/internal/**/*.js'],
    transformers: [
      JSDocTransformer({}),
    ],
    output: [
      {
        dir: path.join('dist', 'internal'),
        format: '.ts',
        flatten: true,
      },
    ],
  },
  {
    input: ['./src/clamp.namedexport.js'],
    transformers: [
      JSDocTransformer({}),
      WasmTransformer({})
    ],
    output: [
      {
        dir: 'dist',
        format: '.wasm',
        filename: 'clamp.wasm',
        flatten: true,
      },
      {
        dir: 'dist',
        format: '.as',
        filename: 'clamp.as.ts',
        flatten: true,
      },
    ],
  }
];


