// import resolve from 'rollup-plugin-node-resolve';
// import { uglify } from "rollup-plugin-uglify";

const prod = process.env.hasOwnProperty('PROD');

const baseConfig = {
    input: 'src/main.js',
    output: {
      file: 'dist/bundle.js',
      format: 'esm'
      // sourcemap: true
    },

    plugins: [
    ]

};

const devConfig = {
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

const prodConfig = {
    ...baseConfig,

    plugins: [
        ...baseConfig.plugins,
        // resolve(),
        // uglify(),
    ]
};

const config = prod ? prodConfig : devConfig;

export default config;