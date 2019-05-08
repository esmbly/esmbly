const path = require('path');
const JSDoc = require('@esmbly/transformer-jsdoc');
const Wasm = require('@esmbly/transformer-wasm');

module.exports = {
  input: ['./src/**/*.js'],
  transformers: [
    JSDoc.createTransformer({}),
    Wasm.createTransformer({
      memory: { import: true },
      use: ['Math=JSMath'],
    }),
  ],
  output: [
    {
      format: '.ts',
      outDir: 'dist',
      rootDir: 'src',
    },
    {
      format: '.wasm',
      outFile: path.join(__dirname, 'dist', 'out.wasm'),
    },
    {
      format: '.as',
      outFile: path.join(__dirname, 'dist', '[name].as.ts'),
    },
  ],
};
