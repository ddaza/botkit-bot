'use strict';
const webpack = require('webpack');
const path = require('path');
const _ = require('lodash');

module.exports = buildWebpack;

function buildWebpack(enviroment) {
  const entry = {
    entry: './index.js',
    target: 'node',
    output: {
      path: path.join(__dirname, './build'),
      filename: 'server.js',
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
}

function plugins(enviroment) {
  let plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(enviroment)
    }),
    // PREFETCH MODULES
    new webpack.PrefetchPlugin(path.join(__dirname, './index.js')),
    new webpack.PrefetchPlugin(path.join(__dirname, './node_modules/botkit/lib/Botkit.js')),
    new webpack.PrefetchPlugin(path.join(__dirname, './node_modules/twilio/lib/index.js')),
    new webpack.PrefetchPlugin(path.join(__dirname, './node_modules/twilio/lib/RestClient.js')),
    new webpack.PrefetchPlugin(path.join(__dirname, './node_modules/twilio/lib/Client.js')),
    new webpack.PrefetchPlugin(path.join(__dirname, './node_modules/twilio/node_modules/request/index.js')),
    new webpack.PrefetchPlugin(path.join(__dirname, './node_modules/twilio/node_modules/bl/bl.js')),
    new webpack.PrefetchPlugin(path.join(__dirname, './node_modules/twilio/node_modules/readable-stream/duplex.js')),
    // OPTIMIZE DEDUPLE
    new webpack.optimize.DedupePlugin()
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
    // CONSIDER REMOVING SOUCE MAPS DUE TO PERFORMANCE
    plugins.push(new webpack.SourceMapDevToolPlugin(
      '[file].map', null,
      '[absolute-resource-path]', '[absolute-resource-path]')
    );
  }

  return {plugins: plugins};
}
