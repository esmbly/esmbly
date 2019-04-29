const { default: esmbly } = require('@esmbly/core');
const { default: FlowTransformer } = require('@esmbly/transformer-flow');
const { default: WasmTransformer } = require('@esmbly/transformer-wasm');

const compile = content => {
  return esmbly.run({
    input: [
      {
        content,
        dir: '/',
        name: 'input',
        type: '.js',
      },
    ],
    output: [{ format: 'WebAssembly' }],
    transformers: [FlowTransformer({}), WasmTransformer({})],
  });
};

const program = `
  export function add(a: number, b: number): number {
    return a + b;
  }
`;

compile(program)
  .then(([{ content }]) => WebAssembly.instantiate(content, {}))
  .then(({ instance }) => console.log(instance.exports.add(2, 3)))
  .catch(err => console.log(err));
