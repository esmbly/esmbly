const path = require('path');
const JSDocTransformer = require('@esmbly/transformer-jsdoc').default;

module.exports = [
  {
    input: ['./src/**/*.js'],
    transformers: [
      JSDocTransformer({}),
    ],
    output: [
      {
        dir: 'dist',
        format: '.ts',
        flatten: true,
      },
    ],
  },
];


