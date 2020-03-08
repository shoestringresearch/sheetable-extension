import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';

export default [{
  input: 'src/index.js',
  output: {
    file: 'dist/Sheetable.js',
    format: 'iife',
    name: 'Sheetable',
    sourcemap: true
  },
  plugins: [
    resolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    })
  ]
}];
