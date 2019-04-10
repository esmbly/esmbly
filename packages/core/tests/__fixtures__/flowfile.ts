import { File, FileType } from '@esmbly/types';

const content = `
// @flow

function padLeft(str: string, maxLength: number): string {
  let s = str;
  while(s.length < maxLength) {
    s = fill + s;
  }
  return s;
}
`;

const file: File = {
  content,
  dir: '/src',
  name: 'leftPad',
  type: FileType.JavaScript,
};

export default file;
