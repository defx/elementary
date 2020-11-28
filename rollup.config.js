import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'index.js',
    output: {
      file: 'dist/elementary.js',
      format: 'es',
    },
  },
  {
    input: 'index.js',
    plugins: [terser()],
    output: {
      file: 'dist/elementary.min.js',
      format: 'es',
    },
  },
];
