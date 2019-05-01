const JSDocTransformer = require('@esmbly/transformer-jsdoc').default;
const WasmTransformer = require('@esmbly/transformer-wasm').default;

module.exports = {
  input: ['./src/**/*.js'],
  transformers: [
    JSDocTransformer({}),
    WasmTransformer({ importMemory: true, use: ['Math=JSMath'] }),
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
