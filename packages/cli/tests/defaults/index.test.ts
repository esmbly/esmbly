import fs from 'fs';
import path from 'path';

describe('Default configuration', () => {
  it('exposes the correct default configuration', () => {
    const configPath = path.join(__dirname, '../../defaults/.esmblyrc.js');
    const content = fs.readFileSync(configPath, 'utf8');
    expect(content).toMatchSnapshot();
  });
});
