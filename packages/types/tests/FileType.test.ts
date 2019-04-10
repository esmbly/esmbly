import { FileType } from '../src';

describe('FileType', () => {
  it('exposes the correct enum', () => {
    expect(FileType).toMatchSnapshot();
  });
});
