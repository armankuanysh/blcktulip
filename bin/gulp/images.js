/**
 * @namespace Gulp.Images
 * @description
 * This is a module that process images
 */
import gulp from 'gulp';
import webp from 'gulp-webp';
import { paths } from '../../gulpfile.babel';

/**
 * @memberof Gulp.Images
 * @function images
 * @name images
 * @description
 * Task function that processes images
 * @returns {Gulp} - returns Gulp task function
 */
export const images = () =>
	gulp
		.src(paths.assets.images.src)
		.pipe(webp())
		.pipe(gulp.dest(paths.assets.images.dest));
