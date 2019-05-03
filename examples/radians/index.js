const fs = require('fs');
const path = require('path');
const { loader } = require('@esmbly/transformer-wasm');

const sourcePath = path.join(__dirname, 'dist', 'radians.wasm');
const source = fs.readFileSync(sourcePath);
const instance = loader.instantiateBuffer(source, {});

module.exports.toDegrees = radians => instance.toDegrees(radians);
module.exports.toRadians = degrees => instance.toRadians(degrees);
