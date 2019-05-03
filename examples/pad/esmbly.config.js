const FlowTransformer = require('@esmbly/transformer-flow').default;
const WasmTransformer = require('@esmbly/transformer-wasm').default;

module.exports = {
  input: ['./src/**/*.js'],
  transformers: [
    FlowTransformer({}),
    WasmTransformer({ memory: { export: true, allocator: 'allocator/tlsf' } }),
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
