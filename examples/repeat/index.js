const fs = require('fs');
const path = require('path');
const { loader } = require('@esmbly/transformer-wasm')
const sourcePath = path.join(__dirname, 'dist', 'repeat.wasm');
const source = fs.readFileSync(sourcePath);
const instance = loader.instantiateBuffer(source, {});

module.exports = (str, times) => {
  const pointer = instance.newString(str);
  const resultPointer = instance.repeat(instance.newString(str), times);
  return instance.getString(resultPointer);
}
