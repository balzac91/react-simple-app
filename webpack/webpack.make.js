const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
      loader: 'eslint'
    }],
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.(png|jpg|jpeg|gif|svg)$/,
      loader: 'file?name=images/[name].[ext]'
    }, {
      test: /\.(woff|woff2|ttf|eot)$/,
      loader: 'file?name=fonts/[name].[ext]'
    }, {
      test: /\.(less|css)$/,
      loader: ExtractTextPlugin.extract('style', 'css!postcss!less')
    }]
  };

  config.postcss = function () {
    return [autoprefixer];
  };

  config.plugins = [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ExtractTextPlugin('styles.css')
  ];

  config.resolve = {
    alias: {
      styles: path.resolve('src/styles'),
      assets: path.resolve('src/assets')
    }
  };

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
      new webpack.optimize.OccurrenceOrderPlugin(true),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        output: {
          comments: false
        }
      })
    ]);
  }

  return config;
};