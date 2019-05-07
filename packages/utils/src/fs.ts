import fs from 'fs';
import util from 'util';
import mkdirp from 'mkdirp';

// eslint-disable-next-line import/no-default-export
export default {
  mkdir: util.promisify(mkdirp),
  mkdtemp: util.promisify(fs.mkdtemp),
  readdir: util.promisify(fs.readdir),
  readFile: util.promisify(fs.readFile),
  stat: util.promisify(fs.stat),
  writeFile: util.promisify(fs.writeFile),
};
