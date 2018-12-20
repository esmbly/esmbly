import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

export default [
  // Browser
  {
    input: 'src/index.js',
    output: [{ file: pkg.browser, name: 'flowasm', format: 'umd' }],
    plugins: [
      babel({
        exclude: ['node_modules/**'],
      }),
      resolve(),
      commonjs(),
    ],
  },
  // Node
  {
    input: 'src/index.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      babel({
        exclude: ['node_modules/**'],
      }),
      commonjs(),
    ],
  },
  // CLI
  {
    input: 'src/bin/index.js',
    output: [{ file: pkg.bin.flowasm, format: 'cjs' }],
    plugins: [
      babel({
        exclude: ['node_modules/**'],
      }),
      commonjs(),
    ],
  },
];
