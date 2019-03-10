import { File, FileType } from '@esmbly/types';

const content = `
function padLeft(str, maxLength) {
  let s = str;
  while(s.length < maxLength) {
    s = fill + s;
  }
  return s;
}
`;

const file: File = {
  name: 'leftPad.js',
  path: 'leftPad.js',
  type: FileType.JavaScript,
  content,
};

export default file;
