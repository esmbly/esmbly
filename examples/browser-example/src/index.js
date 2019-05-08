const esmbly = require('@esmbly/core');
const Flow = require('@esmbly/transformer-flow');
const Wasm = require('@esmbly/transformer-wasm');

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
    transformers: [
      Flow.createTransformer({}),
      Wasm.createTransformer({})
    ],
  });
};

const program = `
  export function add(a: number, b: number): number {
    return a + b;
  }
`;

compile(program)
  .then(([{ content }]) => WebAssembly.instantiate(content, {}))
  .then(({ instance }) => console.log('2 + 3 = ' + instance.exports.add(2, 3)))
  .catch(err => console.log(err));
