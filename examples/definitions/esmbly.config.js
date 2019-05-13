const path = require('path');
const JSDoc = require('@esmbly/transformer-jsdoc');
const TSDefinitions = require('@esmbly/transformer-definitions')

module.exports = {
  input: ['./lib/**/*.js'],
  transformers: [
    JSDoc.createTransformer(),
    TSDefinitions.createTransformer()
  ],
  output: [
    {
      format: '.d.ts',
      outDir: 'dist',
      rootDir: 'lib',
    },
  ],
};
