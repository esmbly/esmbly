import inquirer from 'inquirer';
import { promptForConfig } from '../../src/utils/prompt';

describe('promptForConfig', () => {
  it('asks the correct questions', async () => {
    const promptSpy = jest.spyOn(inquirer, 'prompt');
    // @ts-ignore
    promptSpy.mockImplementation(([{ name }]) => {
      switch (name) {
        case 'input':
          return Promise.resolve({ input: './src/index.js' });
        case 'selectedTransformers':
          return Promise.resolve({
            selectedTransformers: ['transformer-flow', 'transformer-wasm'],
          });
        case 'output':
          return Promise.resolve({ output: ['TypeScript', 'WebAssembly'] });
        case 'outDir':
          return Promise.resolve({ outDir: 'dist' });
        case 'install':
          return Promise.resolve({ install: true });
        case 'pkgManager':
          return Promise.resolve({ pkgManager: 'npm' });
        default:
          throw new Error(`asked for: ${name}`);
      }
    });
    const config = await promptForConfig();
    expect(promptSpy.mock.calls).toMatchSnapshot();
    expect(config).toMatchSnapshot();
  });

  it('throws an error on invalid transformer combinations', async () => {
    const promptSpy = jest.spyOn(inquirer, 'prompt');
    // @ts-ignore
    promptSpy.mockImplementation(([{ name }]) => {
      switch (name) {
        case 'input':
          return Promise.resolve({ input: './src/index.js' });
        case 'selectedTransformers':
          return Promise.resolve({
            selectedTransformers: ['transformer-flow', 'transformer-jsdoc'],
          });
        default:
          throw new Error(`asked for: ${name}`);
      }
    });
    await expect(promptForConfig()).rejects.toMatchSnapshot();
  });
});
