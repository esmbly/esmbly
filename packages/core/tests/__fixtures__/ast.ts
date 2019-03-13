import { FileType } from '@esmbly/types';

export default [
  { type: FileType.JavaScript, toFile: () => 'mock-js-file-a' },
  { type: FileType.JavaScript, toFile: () => 'mock-js-file-b' },
];
