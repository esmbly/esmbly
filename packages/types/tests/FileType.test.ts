import { FileType } from '../src';

describe('OutputFormat', () => {
  it('exposes the correct enum', () => {
    expect(FileType).toMatchSnapshot();
  });
});
