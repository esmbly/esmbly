import { FileType } from '@esmbly/types';

export default [
  { type: FileType.JavaScript, toCode: () => 'mock-js-file-a' },
  { type: FileType.JavaScript, toCode: () => 'mock-js-file-b' },
];
