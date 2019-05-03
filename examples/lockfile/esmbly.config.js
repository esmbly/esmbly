const FlowTransformer = require('@esmbly/transformer-flow').default;

module.exports = {
  input: ['./src/**/*.js'],
  transformers: [FlowTransformer({})],
  output: [
    {
      dir: 'dist',
      format: '.ts',
      flatten: true
    },
  ],
};
