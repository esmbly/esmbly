import { FileType } from '@esmbly/types';
import * as templates from '../src/templates';

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
