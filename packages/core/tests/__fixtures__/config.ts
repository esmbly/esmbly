import { OutputFormat } from '@esmbly/types';

export const output = [OutputFormat.WebAssembly];

export const transformers = [
  {
    run: () => Promise.resolve([{}, {}]),
    hasOutputFormat: jest.fn(),
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
