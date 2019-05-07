import { Writable } from 'stream';
import printer from '@esmbly/printer';
import testRunner from '../helpers/testRunner';

const input = `
  /* @flow */

  type Exact = {| a: number, b: string |}
`;

const expected = `
  type Exact = {
    a: number,
    b: string,
  };
`;

describe('rule: Exact', () => {
  beforeAll(() => printer.setOutStream(new Writable({ write: () => {} })));
  afterAll(() => printer.setOutStream(process.stdout));

  it('correctly transforms the input to TypeScript', async () => {
    const [{ content }] = await testRunner(input);
    expect(content).toEqual(expected);
  });

  it('produces a correctly formated warning', async () => {
    const print = jest.spyOn(printer, 'print');
    await testRunner(input);
    expect(print).toHaveBeenCalledTimes(1);
    expect(print.mock.calls[0][0]).toMatchSnapshot();
    print.mockRestore();
  });
});
