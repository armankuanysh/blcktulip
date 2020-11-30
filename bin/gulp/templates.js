/**
 * @namespace Gulp.Templates
 * @description
 * Module that contains task function, wich builds nunjucks templates
 */
import gulp from 'gulp';
import nunjucks from 'gulp-nunjucks-render';
import rename from 'gulp-rename';
import { paths } from '../../gulpfile.babel';

/**
 * @memberof Gulp.Templates
 * @function njk
 * @name njk
 * @description
 * Task function that builds nunjucks templates
 * @returns {Gulp} - returns Gulp task function
 */
export const njk = () =>
	gulp
		.src(paths.njk.src)
		.pipe(nunjucks({ path: [paths.njk.pages], data: { markup: false } }))
		.pipe(rename({ dirname: '' }))
		.pipe(gulp.dest(paths.njk.dest));
