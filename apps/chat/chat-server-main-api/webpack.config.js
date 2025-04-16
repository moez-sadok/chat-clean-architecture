const { composePlugins, withNx } = require('@nx/webpack');
//for bun
// import { composePlugins, withNx } from '@nx/webpack';

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  return config;
});
