module.exports = ({ config, mode }) => {

  // TODO: This doesn't seem to have any effect in Storybook 5
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [
        ['@babel/preset-typescript'],
      ],
    },
  });

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
