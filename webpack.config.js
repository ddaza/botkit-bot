const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  target: 'node',
  output: {
    path: path.join(__dirname, './build'),
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      output: {comments: false},
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [/node_modules/]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};
