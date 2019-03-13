import parse from '../src/parse';
import jsfile from './__fixtures__/jsfile';
import flowfile from './__fixtures__/flowfile';
import tsfile from './__fixtures__/tsfile';

describe('parse', () => {
  it('correctly parses a JavaScript file', () => {
    const [ast] = parse([jsfile]);
    expect(ast.name).toEqual('leftPad.js');
    expect(ast.path).toEqual('leftPad.js');
    expect(ast.type).toEqual('.js');
    expect(ast.tree).toMatchSnapshot();
    expect(ast.toFile()).toMatchSnapshot();
  });
  it('correctly parses a Flow file', () => {
    const [ast] = parse([flowfile]);
    expect(ast.name).toEqual('leftPad.js');
    expect(ast.path).toEqual('leftPad.js');
    expect(ast.type).toEqual('.js');
    expect(ast.tree).toMatchSnapshot();
    expect(ast.toFile()).toMatchSnapshot();
  });
  it('correctly parses a TypeSCript file', () => {
    const [ast] = parse([tsfile]);
    expect(ast.name).toEqual('leftPad.ts');
    expect(ast.path).toEqual('leftPad.ts');
    expect(ast.type).toEqual('.ts');
    expect(ast.tree).toMatchSnapshot();
    expect(ast.toFile()).toMatchSnapshot();
  });
});
