import fs from 'fs';
import path from 'path';

describe('Default configuration', () => {
  it('rc', () => {
    const configPath = path.join(__dirname, '../../defaults/.esmblyrc');
    const content = fs.readFileSync(configPath, 'utf8');
    expect(content).toMatchSnapshot();
  });
  it('js', () => {
    const configPath = path.join(__dirname, '../../defaults/.esmblyrc.js');
    const content = fs.readFileSync(configPath, 'utf8');
    expect(content).toMatchSnapshot();
  });
});
