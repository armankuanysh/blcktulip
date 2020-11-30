/* eslint-disable import/no-cycle */
/**
 * @namespace Gulp
 * @description
 * This is a main gulpfile module that contain all tasks
 */
import gulp from 'gulp';
import { njk } from './bin/gulp/templates';
import { styles, pageStyles } from './bin/gulp/styles';
import { scripts } from './bin/gulp/scripts';
import { serveDev, serveDocs } from './bin/gulp/sync';
import { imports } from './bin/gulp/imports';

/**
 * @typedef njk
 * @property {string} src – source of .njk files
 * @property {string} pages - source of all pages
 * @property {string} dest - destination source
 */

/**
 * @typedef sass
 * @property {string} src - source of sass files
 * @property {string} pages - source of page style files
 * @property {string} dest - destination source
 */

/**
 * @typedef scripts
 * @property {string} src - source of scripts files ts or js
 * @property {string} dest - destination source
 */

/**
 * @typedef pathsT
 * @property {string} package - path to package.json
 * @property {njk} njk - source of nunjucks templates
 * @property {sass} sass - source of sass files
 * @property {scripts} scripts - source of script files
 * @property {string} docs - destination source of docs
 */
export const paths = {
	package: 'package.json',
	njk: {
		src: 'src/pages/**/*.njk',
		pages: 'src/',
		dest: '.tmp/'
	},
	sass: {
		src: 'src/styles/**/*.{scss,sass}',
		pages: 'src/pages/**/*.{scss,sass}',
		components: 'src/components/**/*.{scss,sass}',
		dest: '.tmp/css'
	},
	scripts: {
		src: 'src/**/*.{js,ts}',
		dest: '.tmp/scripts'
	},
	assets: {
		images: {
			src: 'src/assets/images/pics/**/*.{png,jpeg,jpg}',
			dest: '.tmp/images/pics'
		}
	},
	imports: {
		src: 'src/pages/**/*.imports.json'
	},
	docs: 'docs'
};

export const context = __dirname;

/**
 * @memberof Gulp
 * @name pages
 * @description
 * Gulp task that builds templates
 * @example
 * gulp.task('pages', njk);
 */
gulp.task('pages', njk);

/**
 * @memberof Gulp
 * @name styles
 * @description
 * Gulp task that builds styles
 * @example
 * gulp.task('styles', styles);
 */
gulp.task('styles', styles);

/**
 * @memberof Gulp
 * @name pageStyles
 * @description
 * Gulp task that builds styles of pages
 * @example
 * gulp.task('pageStyles', pageStyles);
 */
gulp.task('pageStyles', pageStyles);

/**
 * @memberof Gulp
 * @name scripts
 * @description
 * Gulp task that builds scripts
 * @example
 * gulp.task('scripts', scripts);
 */
gulp.task('scripts', scripts);

/**
 * @memberof Gulp
 * @name imports
 * @description
 * Gulp task that builds imports
 * @example
 * gulp.task('imports', gulp.series(imports));
 */
gulp.task('imports', gulp.series(imports));

/**
 * @memberof Gulp
 * @name serve
 * @description
 * Gulp task that runs local development server
 * @example
 * gulp.task('serve', gulp.series(gulp.series('pages', 'styles', 'scripts'), serveDev));
 */
gulp.task(
	'serve',
	gulp.series(gulp.series('pages', 'styles', 'pageStyles', 'scripts'), serveDev)
);

/**
 * @memberof Gulp
 * @name serve:docs
 * @description
 * Gulp task that runs local server for docs
 * @example
 * gulp.task('serve:docs', gulp.series(serveDocs));
 */
gulp.task('serve:docs', gulp.series(serveDocs));
