const fs = require('fs');
const path = require('path');
const { loader } = require('@esmbly/transformer-wasm')
const sourcePath = path.join(__dirname, 'dist', 'sort.wasm');
const source = fs.readFileSync(sourcePath);
const instance = loader.instantiateBuffer(source, {});

module.exports = (arr) => {
  const pointer = instance.newArray(arr);
  const resultPointer = instance.sort(pointer);
  return instance.getArray(Int32Array, resultPointer);
}
