import fs from 'fs';
import util from 'util';

export default {
  mkdir: util.promisify(fs.mkdir),
  mkdtemp: util.promisify(fs.mkdtemp),
  readdir: util.promisify(fs.readdir),
  readFile: util.promisify(fs.readFile),
  stat: util.promisify(fs.stat),
  writeFile: util.promisify(fs.writeFile),
};
