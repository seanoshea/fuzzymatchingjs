import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from '@rollup/plugin-terser';
import pkg from './package.json' assert { type: 'json' };

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'fuzzymatchingjs',
      file: pkg.browser,
      format: 'umd',
    },
    plugins: [
      resolve(),
      commonjs(),
    ],
  },
  {
    input: 'src/index.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      terser({
        output: {
          comments: 'all',
        },
      }),
    ],
  },
];
