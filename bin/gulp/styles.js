/**
 * @namespace Gulp.Styles
 * @description
 * This is a module that contains task functions to build and run sass
 */
import gulp from 'gulp';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import cssnext from 'postcss-cssnext';
import hexrgba from 'postcss-hexrgba';
import colorFallback from 'postcss-color-rgba-fallback';
import { paths } from '../../gulpfile.babel';

/**
 * @memberof Gulp.Styles
 * @function styles
 * @name styles
 * @description
 * Task function that builds and runs sass files
 * @returns {Gulp} - returns Gulp task function
 */
export const styles = () =>
	gulp
		.src(paths.sass.src)
		.pipe(
			sass
				.sync({
					outputStyle: 'compressed',
					precision: 10,
					includePaths: ['.']
				})
				.on('error', sass.logError)
		)
		.pipe(
			postcss([
				cssnext({
					browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
				}),
				hexrgba(),
				colorFallback()
			])
		)
		.pipe(gulp.dest(paths.sass.dest));

/**
 * @memberof Gulp.Styles
 * @function pageStyles
 * @name pageStyles
 * @description
 * Task function that builds and runs sass files of page
 * @returns {Gulp} - returns Gulp task function
 */
export const pageStyles = () =>
	gulp
		.src(paths.sass.pages)
		.pipe(
			sass({
				outputStyle: 'compressed',
				precision: 10,
				includePaths: ['.']
			}).on('error', sass.logError)
		)
		.pipe(
			postcss([
				cssnext({
					browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
				}),
				hexrgba(),
				colorFallback()
			])
		)
		.pipe(rename({ dirname: '' }))
		.pipe(gulp.dest(paths.sass.dest));
