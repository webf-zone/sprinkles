// import resolve from 'rollup-plugin-node-resolve';
// import { uglify } from 'rollup-plugin-uglify';
import scss from 'rollup-plugin-scss'
import typescript from 'rollup-plugin-typescript';


const baseConfig = {
    input: 'src/main.ts',
    output: {
      file: 'dist/bundle.js',
      format: 'esm'
      // sourcemap: true
    },

    plugins: [
      typescript(),
      scss({ output: false })
    ]
};

const prodConfig = {
    ...baseConfig,

    watch: {
      exclude: 'node_modules/**'
    },

    external: (id) => {
      const modules = [
      ];
      return modules.some((x) => id.startsWith(x));
    }

};

export default prodConfig;