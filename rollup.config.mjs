import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/code.js',
    format: 'iife',
    name: 'GasIntegrations'
  },
  plugins: [
    typescript({
      tsconfig: "tsconfig.json"
    })
  ]
};
