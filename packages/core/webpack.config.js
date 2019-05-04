const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

module.exports = {
  entry: ['./dist/index.js'],
  devtool: 'none',
  resolve: {
    extensions: ['.js'],
  },
  output: {
    filename: 'index.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: "core",
    libraryTarget: "umd",
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  performance: {
    hints : false
  }
};
