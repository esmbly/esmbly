const path = require('path');
const FooTransformer = require('./src/FooTransformer');

module.exports = {
  input: ['./example/**/*.ts'],
  transformers: [
    new FooTransformer(),
  ],
  output: [
    {
      format: '.ts',
      outFile: path.join(__dirname, 'dist', 'bar.ts'),
    },
  ],
};
