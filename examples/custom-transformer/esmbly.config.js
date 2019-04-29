const FooTransformer = require('./src/FooTransformer');

module.exports = {
  input: ['./example/**/*.ts'],
  transformers: [new FooTransformer()],
  output: [
    {
      dir: 'dist',
      format: 'TypeScript',
      filename: 'bar.ts',
      flatten: true,
    },
  ],
};
