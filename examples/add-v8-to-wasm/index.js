const fs = require('fs');
const path = require('path');
const { loader } = require('@esmbly/transformer-wasm');
const sourcePath = path.join(__dirname, 'dist', 'add.wasm');
const source = fs.readFileSync(sourcePath);
const instance = loader.instantiateBuffer(source, {});

module.exports = (a, b) => {
  return instance.add(a, b);
};
