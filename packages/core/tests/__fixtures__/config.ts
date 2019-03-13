export const output = ['WebAssembly'];

export const transformers = [
  {
    transform: () => Promise.resolve([{}, {}]),
  },
];

export const input = [
  {
    name: 'file.js',
    path: 'path/file.js',
    content: 'console.log("Hello World!")',
    type: 'JavaScript',
  },
];
