'use strict';

const gulp = require('gulp');
const bg = require('gulp-bg');
const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

gulp.task('build-server', function (done) {
  webpack(webpackConfig, function (err, stats) {
    if (err) {
      gutil.log('Error', err);
    } else {
      Object.keys(stats.compilation.assets).forEach(function(key) {
        gutil.log('Webpack: output ', gutil.colors.green(key));
      });
      gutil.log('Webpack: ', gutil.colors.blue('finished ', stats.compilation.name));
    }

    if (done) {
      done();
    }
  });
});

gulp.task('run-server', bg('node', './build/server.js'));
