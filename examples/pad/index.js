const fs = require('fs');
const path = require('path');
const { loader } = require('@esmbly/transformer-wasm')
const sourcePath = path.join(__dirname, 'dist', 'pad.wasm');
const source = fs.readFileSync(sourcePath);
const instance = loader.instantiateBuffer(source, {});

module.exports.padLeft = (str, maxLength) => {
  const pointer = instance.newString(str);
  const resultPointer = instance.padLeft(instance.newString(str), maxLength);
  return instance.getString(resultPointer);
}

module.exports.padRight = (str, maxLength) => {
  const pointer = instance.newString(str);
  const resultPointer = instance.padRight(instance.newString(str), maxLength);
  return instance.getString(resultPointer);
}
