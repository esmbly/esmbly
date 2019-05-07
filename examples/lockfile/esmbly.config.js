const Flow = require('@esmbly/transformer-flow');

module.exports = {
  input: ['./src/**/*.js'],
  transformers: [
    Flow.createTransformer({})
  ],
  output: [
    {
      dir: 'dist',
      format: '.ts',
      flatten: true,
    },
  ],
};
