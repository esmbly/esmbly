const path = require('path');
const t = require('@babel/types');
const Flow = require('@esmbly/transformer-flow');
const Wasm = require('@esmbly/transformer-wasm');

const DefaultReturnTypeToNumber = (warnings) => ({
  FunctionDeclaration(path) {
    if (!path.node.returnType) {
      warnings.push({
        info: `Found function without return type, using number as default`,
        loc: path.container.loc,
      });
      path.node.returnType = t.typeAnnotation(t.numberTypeAnnotation());
    }
  }
});

module.exports = {
  input: ['./src/**/*.js'],
  transformers: [
    Flow.createTransformer({ customRules: { DefaultReturnTypeToNumber }}),
    Wasm.createTransformer({}),
  ],
  output: [
    {
      format: '.ts',
      outFile: path.join(__dirname, 'dist', 'add.ts'),
    },
    {
      format: '.wasm',
      outFile: path.join(__dirname, 'dist', 'add.wasm'),
    },
  ],
};
