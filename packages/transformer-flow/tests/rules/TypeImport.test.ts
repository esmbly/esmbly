import { testRunner } from '../helpers/testRunner';

const input = `
  /* @flow */

  import type A from "./a"
  import type { B } from "./b"
  import type { C, D } from "./c"
  import type E, { F, G } from "./d"
`;

const expected = `
  import A from "./a";
  import { B } from "./b";
  import { C, D } from "./c";
  import E, { F, G } from "./d";
`;

describe('rule: TypeImport', () => {
  it('correctly transforms the input to TypeScript', async () => {
    const [{ content }] = await testRunner(input);
    expect(content).toEqual(expected);
  });
});
