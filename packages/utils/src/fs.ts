import fs from 'fs';
import util from 'util';

export default {
  readFile: util.promisify(fs.readFile),
  readdir: util.promisify(fs.readdir),
  stat: util.promisify(fs.stat),
  writeFile: util.promisify(fs.writeFile),
};
