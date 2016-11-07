'use strict';

const gulp = require('gulp');
const bg = require('gulp-bg');
const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

const enviroment = String(process.env.NODE_ENV || 'DEV').toUpperCase();

gulp.task('build-server', function (done) {
  gutil.log(gutil.colors.magenta('Enviroment:'), enviroment);

  webpack(webpackConfig(enviroment), function (err, stats) {
    if (err) {
      throw new gutil.PluginError('[webpack:ERROR]', err);
    }

    gutil.log('[webpack:build] ', stats.toString({
      colors: true,
      chunks: false
    }));

    if (done) {
      done();
    }
  });
});

gulp.task('run-server', bg('node', './build/server.js'));

gulp.task('default', ['build-server'], bg('node', './build/server.js'));
