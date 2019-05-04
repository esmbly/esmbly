const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

module.exports = {
  entry: ['./dist/index.js'],
  devtool: 'none',
  resolve: {
    extensions: ['.js'],
  },
  node: {
    fs: 'empty',
  },
  output: {
    filename: 'index.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: "transformer-wasm",
    libraryTarget: "umd",
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  performance: {
    hints : false
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
