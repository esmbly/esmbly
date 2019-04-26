const fs = require('fs');
const util = require('util');
const path = require('path');
const readFile = util.promisify(fs.readFile);

let instance;
const createInstance = async () => {
  if (instance) {
    return instance;
  }
  const sourcePath = path.join(__dirname, 'dist', 'out.wasm');
  const source = await readFile(sourcePath, 'utf8');
  instance = await WebAssembly.instantiate(source, {});
  return instance;
}

module.exports = async (a, b) => {
  const { instance } = await createInstance();
  return instance.exports.add(2, 3);
}