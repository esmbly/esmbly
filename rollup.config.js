import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

import cli from './packages/cli/package.json';

export default [
  {
    // cli
    input: 'packages/cli/src/index.js',
    output: [
      { file: cli.main, format: 'cjs', dir: 'packages/cli/dist' },
      { file: cli.module, format: 'es', dir: 'packages/cli/dist' },
    ],
    plugins: [
      babel({
        exclude: ['**/node_modules/**'],
      }),
      commonjs(),
    ],
  },
];
