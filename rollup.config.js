import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/elementary.js',
      format: 'es',
    },
  },
  {
    input: 'src/index.js',
    plugins: [terser()],
    output: {
      file: 'dist/elementary.min.js',
      format: 'es',
    },
  },
];
