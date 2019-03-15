import * as utils from '@esmbly/utils';
import inquirer from 'inquirer';
import { promptForConfig } from '../src/prompt';

describe('promptForConfig', () => {
  it('asks the correct questions', async () => {
    const promptSpy = jest.spyOn(inquirer, 'prompt');
    promptSpy.mockResolvedValue({});
    const getAvailableTransformersSpy = jest.spyOn(
      utils,
      'getAvailableTransformers',
    );
    getAvailableTransformersSpy.mockResolvedValue(['flow', 'wasm']);
    const getAvailableOutputFormatsSpy = jest.spyOn(
      utils,
      'getAvailableOutputFormats',
    );
    getAvailableOutputFormatsSpy.mockResolvedValue([
      'TypeScript',
      'WebAssembly',
    ]);
    await promptForConfig();
    expect(promptSpy.mock.calls).toMatchSnapshot();
    expect(getAvailableTransformersSpy).toHaveBeenCalledTimes(1);
    expect(getAvailableOutputFormatsSpy).toHaveBeenCalledTimes(1);
  });
});
