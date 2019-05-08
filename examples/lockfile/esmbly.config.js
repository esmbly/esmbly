const Flow = require('@esmbly/transformer-flow');

module.exports = {
  input: ['./src/**/*.js'],
  transformers: [
    Flow.createTransformer(),
  ],
  output: [
    {
      format: '.ts',
      outDir: 'dist',
      rootDir: 'src',
    },
  ],
};
