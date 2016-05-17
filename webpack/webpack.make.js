const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (options) {
  const BUILD = !!options.BUILD;

  var config = {};

  config.entry = './src/app.js';

  config.output = {
    path: './dist',
    filename: 'bundle.js'
  };

  config.module = {
    preLoaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }],
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  };

  config.plugins = [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ];

  /**
   * Only for dev environment
   */
  if (!BUILD) {
    config.devtool = 'inline-source-map';

    config.devServer = {
      stats: 'minimal'
    };
  }

  /**
   * Only for build environment
   */
  if (BUILD) {
    config.plugins = config.plugins.concat([
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(true)
    ]);
  }

  return config;
};