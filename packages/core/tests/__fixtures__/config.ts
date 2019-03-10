export const output = ['WebAssembly'];

export const transformers = [() => Promise.resolve([{}, {}])];

export const files = [
  {
    name: 'file.js',
    path: 'path/file.js',
    content: 'console.log("Hello World!")',
    type: 'JavaScript',
  },
];
