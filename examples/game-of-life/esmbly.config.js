const JSDoc = require('@esmbly/transformer-jsdoc');
const Wasm = require('@esmbly/transformer-wasm');

module.exports = {
  input: ['./src/**/*.js'],
  transformers: [
    JSDoc.createTransformer({}),
    Wasm.createTransformer({
      memory: { import: true },
      use: ['Math=JSMath']
    }),
  ],
  output: [
    {
      dir: 'dist',
      format: '.ts',
      flatten: true,
    },
    {
      dir: 'dist',
      format: '.wasm',
      filename: 'out.wasm',
      flatten: true,
    },
    {
      dir: 'dist',
      format: '.as',
      filename: '[name].as.ts',
      flatten: true,
    },
  ],
};
