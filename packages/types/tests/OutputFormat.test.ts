import { OutputFormat } from '../src';

describe('OutputFormat', () => {
  it('exposes the correct enum', () => {
    expect(OutputFormat).toMatchSnapshot();
  });
});
