import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import $Exact from '../../src/rules/$Exact';
import { Warning } from '../../src/types';

const createMockPath = (
  identifierName: string,
  params: string[],
): NodePath<t.GenericTypeAnnotation> => ({
  node: {
    id: t.identifier(identifierName),
    // @ts-ignore
    typeParameters: { params },
  },
  replaceWith: jest.fn(),
});

describe('$Exact', () => {
  it('correctly replaces the path', () => {
    const path = createMockPath('$Exact', ['paramA']);
    const warnings: Warning[] = [];
    // @ts-ignore
    $Exact(warnings).GenericTypeAnnotation(path);
    expect(path.replaceWith).toHaveBeenCalledWith('paramA');
  });

  it('warns about that $Exact types', () => {
    const path = createMockPath('$Exact', ['paramA']);
    const warnings: Warning[] = [];
    // @ts-ignore
    $Exact(warnings).GenericTypeAnnotation(path);
    expect(warnings).toMatchSnapshot();
  });

  it('does not replace paths without an id', () => {
    const path = createMockPath('$Exact', ['paramA']);
    // @ts-ignore
    path.node.id = null;
    const warnings: Warning[] = [];
    // @ts-ignore
    $Exact(warnings).GenericTypeAnnotation(path);
    expect(warnings).toEqual([]);
    expect(path.replaceWith).not.toHaveBeenCalled();
  });

  it('does not replace paths without the identifier name $Exact', () => {
    const path = createMockPath('SomeName', ['paramA']);
    const warnings: Warning[] = [];
    // @ts-ignore
    $Exact(warnings).GenericTypeAnnotation(path);
    expect(warnings).toEqual([]);
    expect(path.replaceWith).not.toHaveBeenCalled();
  });

  it('does not replace paths without typeParameters', () => {
    const path = createMockPath('$Exact', ['paramA']);
    path.node.typeParameters = null;
    const warnings: Warning[] = [];
    // @ts-ignore
    $Exact(warnings).GenericTypeAnnotation(path);
    expect(warnings).toEqual([]);
    expect(path.replaceWith).not.toHaveBeenCalled();
  });
});
