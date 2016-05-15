const webpack = require('webpack');

module.exports = {
  entry: './src/app.js',
  output: {
    path: './bin',
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ]
};