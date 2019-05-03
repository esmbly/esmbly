const FlowTransformer = require('@esmbly/transformer-flow').default;
const WasmTransformer = require('@esmbly/transformer-wasm').default;

module.exports = {
  input: ['./src/**/*.js'],
  transformers: [FlowTransformer({}), WasmTransformer({})],
  output: [
    {
      dir: 'dist',
      format: '.ts',
      flatten: true,
    },
    {
      dir: 'dist',
      format: '.wat',
      filename: 'add.wat',
      flatten: true,
    },
    {
      dir: 'dist',
      format: '.wasm',
      filename: 'add.wasm',
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
