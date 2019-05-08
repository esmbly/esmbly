const path = require('path');
const JSDoc = require('@esmbly/transformer-jsdoc');

module.exports = [
  {
    input: ['./src/**/*.js'],
    transformers: [
      JSDoc.createTransformer({}),
    ],
    output: [
      {
        format: '.ts',
        outFile: path.join(__dirname, 'dist', 'index.ts')
      },
    ],
  },
];
