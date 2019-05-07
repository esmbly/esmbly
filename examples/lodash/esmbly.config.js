const path = require('path');
const JSDoc = require('@esmbly/transformer-jsdoc');
const Wasm = require('@esmbly/transformer-wasm');

// TODO: Merge this into one config once output formats has been improved
// TODO: Transform some additional methods to WebAssembly as well
module.exports = [
  {
    input: ['./src/**/*.js', '!./src/internal/**/*.js'],
    transformers: [
      JSDoc.createTransformer({}),
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
      JSDoc.createTransformer({}),
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
      JSDoc.createTransformer({}),
      Wasm.createTransformer({}),
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


