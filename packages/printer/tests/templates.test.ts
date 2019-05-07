import { FileType } from '@esmbly/types';
import * as templates from '../src/templates';

jest.mock('chalk', () => ({
  cyan: (str: string) => `cyan<${str}>`,
  dim: (str: string) => `dim<${str}>`,
  red: (str: string) => `red<${str}>`,
  yellow: (str: string) => `yellow<${str}>`,
}));

describe('templates', () => {
  it('provides a correct template for warnings', () => {
    expect(
      templates.warning({
        file: {
          content: 'function add(a: any): string {}',
          dir: 'src',
          name: 'add',
          type: FileType.JavaScript,
        },
        info: 'info about the warning',
        issueUrl: 'some url',
        loc: {
          end: { column: 20, line: 1 },
          start: { column: 14, line: 1 },
        },
      }),
    ).toMatchSnapshot();
  });
});
