const pkg = require('./package.json');
const fs = require('fs');
const rollup = require('rollup').rollup;
const babel = require('rollup-plugin-babel');

import nodeResolve from 'rollup-plugin-node-resolve';
const commonjs = require('rollup-plugin-commonjs');
const builtins = require('rollup-plugin-node-builtins');
const globals = require('rollup-plugin-node-globals');

rollup({
  entry: 'src/index.js',
  plugins: [
    babel({
      presets: ['es2015-rollup'],
      babelrc: false,
    }),
    globals(),
    builtins(),
    nodeResolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs({
      include: 'node_modules/**',
    }),
  ],
}).then(bundle => (
  bundle.write({
    dest: 'dist/fuzzymatching.js',
    format: 'umd',
    moduleName: pkg.name,
    banner: (
      '/*!\n' +
      String(fs.readFileSync('./LICENSE')).trim().split('\n').map(l => ` * ${l}`).join('\n') +
      '\n */'
    ),
  })
)).catch(e => {
  process.stderr.write(e.message + '\n');
  process.exit(1);
});
