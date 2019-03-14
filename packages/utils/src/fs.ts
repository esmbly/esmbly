import fs from 'fs';
import util from 'util';

export default {
  readdir: util.promisify(fs.readdir),
  stat: util.promisify(fs.stat),
  writeFile: util.promisify(fs.writeFile),
  readFile: util.promisify(fs.readFile),
};
