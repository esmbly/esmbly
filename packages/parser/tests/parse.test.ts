import { FileType } from '@esmbly/types';
import parse from '../src';
import jsfile from './__fixtures__/jsfile';
import flowfile from './__fixtures__/flowfile';
import tsfile from './__fixtures__/tsfile';

describe('parse', () => {
  it('correctly parses a JavaScript file', () => {
    const [ast] = parse([jsfile]);
    expect(ast.represents.name).toEqual('leftPad');
    expect(ast.represents.dir).toEqual('/src');
    expect(ast.represents.type).toEqual(FileType.JavaScript);
    expect(ast.represents.content).toEqual(jsfile.content);
    expect(ast.tree).toMatchSnapshot();
    expect(ast.toCode()).toEqual(jsfile.content);
  });
  it('correctly parses a Flow file', () => {
    const [ast] = parse([flowfile]);
    expect(ast.represents.name).toEqual('leftPad');
    expect(ast.represents.dir).toEqual('/src');
    expect(ast.represents.type).toEqual(FileType.JavaScript);
    expect(ast.represents.content).toEqual(flowfile.content);
    expect(ast.tree).toMatchSnapshot();
    expect(ast.toCode()).toEqual(flowfile.content);
  });
  it('correctly parses a TypeSCript file', () => {
    const [ast] = parse([tsfile]);
    expect(ast.represents.name).toEqual('leftPad');
    expect(ast.represents.dir).toEqual('/src');
    expect(ast.represents.type).toEqual(FileType.TypeScript);
    expect(ast.represents.content).toEqual(tsfile.content);
    expect(ast.tree).toMatchSnapshot();
    expect(ast.toCode()).toEqual(tsfile.content);
  });
});
