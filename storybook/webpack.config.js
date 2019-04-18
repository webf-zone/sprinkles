const path = require('path');

module.exports = ({ config, mode }) => {

  // TODO: This doesn't seem to have any effect in Storybook 5
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [
        ['@babel/preset-typescript'],
      ],
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: false, decoratorsBeforeExport: true }],
        ['@babel/plugin-proposal-class-properties', { loose : true }]
      ]
    },
  });

  config.module.rules.push({
    test: /\.scss$/,
    use: [
      'raw-loader',
      {
        loader: 'sass-loader',
        options: {
          includePaths: [
            path.resolve(__dirname, 'node_modules')
          ]
        }
      }
    ]
  });

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
