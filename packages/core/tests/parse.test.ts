import * as babelParser from '@babel/parser';
import { FileType, Format, Transformer } from '@esmbly/types';
import parse from '../src/parse';
import jsfile from './__fixtures__/jsfile';
import flowfile from './__fixtures__/flowfile';
import tsfile from './__fixtures__/tsfile';

describe('parse', () => {
  it('correctly parses a JavaScript file', () => {
    const JSTransformer: Transformer = {
      format: {
        files: [],
        input: Format.Any,
        output: Format.TypeScript,
      },
      parserPlugins: [],
    };
    const [ast] = parse([jsfile], JSTransformer);
    expect(ast.represents.name).toEqual('leftPad');
    expect(ast.represents.dir).toEqual('/src');
    expect(ast.represents.type).toEqual(FileType.JavaScript);
    expect(ast.represents.content).toEqual(jsfile.content);
    expect(ast.tree).toMatchSnapshot();
    expect(ast.toCode()).toEqual(jsfile.content);
  });

  it('correctly parses a Flow file', () => {
    const FlowTransformer: Transformer = {
      format: {
        files: [Format.TypeScript],
        input: Format.Flow,
        output: Format.TypeScript,
      },
      parserPlugins: ['flow', 'flowComments'],
    };
    const [ast] = parse([flowfile], FlowTransformer);
    expect(ast.represents.name).toEqual('leftPad');
    expect(ast.represents.dir).toEqual('/src');
    expect(ast.represents.type).toEqual(FileType.JavaScript);
    expect(ast.represents.content).toEqual(flowfile.content);
    expect(ast.tree).toMatchSnapshot();
    expect(ast.toCode()).toEqual(flowfile.content);
  });

  it('correctly parses a TypeScript file', () => {
    const TsTransformer: Transformer = {
      format: {
        files: [Format.Flow],
        input: Format.TypeScript,
        output: Format.Flow,
      },
      parserPlugins: ['typescript'],
    };
    const [ast] = parse([tsfile], TsTransformer);
    expect(ast.represents.name).toEqual('leftPad');
    expect(ast.represents.dir).toEqual('/src');
    expect(ast.represents.type).toEqual(FileType.TypeScript);
    expect(ast.represents.content).toEqual(tsfile.content);
    expect(ast.tree).toMatchSnapshot();
    expect(ast.toCode()).toEqual(tsfile.content);
  });

  it('correctly uses a custom parser', () => {
    const ScriptTransformer = {
      format: {
        files: [Format.Flow],
        input: Format.TypeScript,
        output: Format.Flow,
      },
      parser: {
        parse(source: string) {
          return babelParser.parse(source, {
            plugins: [],
            sourceType: 'script',
          });
        },
      },
    };
    const parseSpy = jest.spyOn(ScriptTransformer.parser, 'parse');
    const [ast] = parse([jsfile], ScriptTransformer);
    expect(ast.represents.name).toEqual('leftPad');
    expect(ast.represents.dir).toEqual('/src');
    expect(ast.represents.type).toEqual(FileType.JavaScript);
    expect(ast.represents.content).toEqual(jsfile.content);
    expect(ast.tree).toMatchSnapshot();
    expect(ast.toCode()).toEqual(jsfile.content);
    expect(parseSpy).toHaveBeenCalled();
  });

  it('adds utilities for handling format', () => {
    const FlowTransformer: Transformer = {
      format: {
        files: [Format.TypeScript],
        input: Format.Flow,
        output: Format.TypeScript,
      },
      parserPlugins: ['flow', 'flowComments'],
    };
    const [ast] = parse([flowfile], FlowTransformer);
    expect(ast.format).toEqual(Format.Flow);
    ast.setFormat(Format.TypeScript);
    expect(ast.format).toEqual(Format.TypeScript);
  });

  it('adds utilities for converting the ast back into a file', () => {
    const FlowTransformer: Transformer = {
      format: {
        files: [Format.TypeScript],
        input: Format.Flow,
        output: Format.TypeScript,
      },
      parserPlugins: ['flow', 'flowComments'],
    };
    const [ast] = parse([flowfile], FlowTransformer);
    const output = { format: Format.TypeScript };
    const file = ast.toFile(output);
    expect(file).toMatchSnapshot();
  });
});
