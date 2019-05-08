const path = require('path');
const JSDoc = require('@esmbly/transformer-jsdoc');
const Wasm = require('@esmbly/transformer-wasm');

module.exports = [
  {
    input: ['./src/**/*.js'],
    transformers: [
      JSDoc.createTransformer({}),
    ],
    output: [
      {
        format: '.ts',
        outDir: 'dist',
        rootDir: 'src'
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
        format: '.wasm',
        outFile: path.join(__dirname, 'dist', 'clamp.wasm'),
      },
      {
        format: '.as',
        outFile: path.join(__dirname, 'dist', 'clamp.as.ts'),
      },
    ],
  }
];


