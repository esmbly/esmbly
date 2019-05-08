const path = require('path');
const FooTransformer = require('./src/FooTransformer');

module.exports = {
  input: ['./example/**/*.ts'],
  transformers: [
    new FooTransformer(),
  ],
  output: [
    {
      format: '.bar.ts',
      outDir: 'dist',
      rootDir: 'example'
    },
  ],
};
