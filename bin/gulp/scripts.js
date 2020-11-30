/**
 * @namespace Gulp.Scripts
 * @description
 * Module that contains task function, wich runs or builds scripts
 */
import gulp from 'gulp';
import named from 'vinyl-named';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import config from '../../webpack.config';
import { paths } from '../../gulpfile.babel';

/**
 * @memberof Gulp.Scripts
 * @function scripts
 * @name scripts
 * @description
 * Task function that runs and builds scripts with webpack
 * @returns {Gulp} - returns Gulp task function
 */
export const scripts = () =>
	gulp
		.src(paths.scripts.src)
		.pipe(named())
		.pipe(webpackStream(config), webpack)
		.pipe(gulp.dest(paths.scripts.dest));
