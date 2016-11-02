'use strict';
const webpack = require('webpack');
const path = require('path');
const _ = require('lodash');

module.exports = function (enviroment) {
  const entry = {
    entry: {
      vendor: ['babel-polyfill'],
      server: './src/index.js'
    },
    target: 'node',
    output: {
      path: path.join(__dirname, './build'),
      filename: '[name].js',
    },
  };

  const loaders = {
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

  return _.extend(entry, plugins(enviroment), loaders);
};

function plugins(enviroment) {
  let plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    })
  ];

  if (enviroment === 'PROD') {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        output: {comments: false},
        compress: {
          warnings: false
        }
      })
    );
  } else {
    plugins.push(new webpack.SourceMapDevToolPlugin(
      '[file].map', null,
      '[absolute-resource-path]', '[absolute-resource-path]')
    );
  }

  return {plugins: plugins};
}
