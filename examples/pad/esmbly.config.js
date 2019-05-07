const Flow = require('@esmbly/transformer-flow');
const Wasm = require('@esmbly/transformer-wasm');

module.exports = {
  input: ['./src/**/*.js'],
  transformers: [
    Flow.createTransformer({}),
    Wasm.createTransformer({
      memory: { export: true, allocator: 'allocator/tlsf' }
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
      filename: 'pad.wasm',
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