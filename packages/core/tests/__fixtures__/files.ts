import { File, FileType } from '@esmbly/types';

export const files = [
  {
    content: 'function foo() { return 1; }',
    dir: '/',
    name: 'fileA',
    type: FileType.JavaScript,
  },
  {
    content: 'function test() { return 2; }',
    dir: '/dir',
    name: 'fileB',
    type: FileType.JavaScript,
  },
];

const flowfileContent = `
// @flow

function padLeft(str: string, maxLength: number): string {
  let s = str;
  while(s.length < maxLength) {
    s = fill + s;
  }
  return s;
}
`;

export const flowfile: File = {
  content: flowfileContent,
  dir: '/src',
  name: 'leftPad',
  type: FileType.JavaScript,
};

const jsfileContent = `
function padLeft(str, maxLength) {
  let s = str;
  while(s.length < maxLength) {
    s = fill + s;
  }
  return s;
}
`;

export const jsfile: File = {
  content: jsfileContent,
  dir: '/src',
  name: 'leftPad',
  type: FileType.JavaScript,
};

const tsfileContent = `
function padLeft(str: string, maxLength: number): string {
  let s = str;
  while(s.length < maxLength) {
    s = fill + s;
  }
  return s;
}
`;

export const tsfile: File = {
  content: tsfileContent,
  dir: '/src',
  name: 'leftPad',
  type: FileType.TypeScript,
};
