/**
 * @namespace Gulp.Sync
 * @description
 * Module that contains task function wich runs local servers for different sources
 */
import gulp from 'gulp';
import sync from 'browser-sync';
import fs from 'fs';
import { imports } from './imports';
import { paths } from '../../gulpfile.babel';

/**
 * @memberof Gulp.Sync
 * @function serveDev
 * @name serveDev
 * @description
 * Task function that runs local server for development
 * @returns {Gulp} - returns Gulp task function
 */
export const serveDev = () => {
	sync({
		notify: false,
		port: 9000,
		server: {
			baseDir: ['.tmp', 'src'],
			routes: {
				'/node_modules': 'node_modules'
			}
		},
		logPrefix: '🚀: ROCKETFRONT :🌑',
		logConnections: true,
		ghostMode: false
	});
	gulp.watch(paths.njk.src, gulp.series('pages'));
	gulp.watch(paths.sass.src, gulp.series('styles'));
	gulp.watch(paths.sass.pages, gulp.series('pageStyles'));
	gulp.watch(paths.sass.components, gulp.series('styles', 'pageStyles'));
	gulp.watch(paths.scripts.src, gulp.series('scripts'));
	gulp.watch(paths.imports.src).on('change', imports);
	sync.watch('.tmp/**/*.*').on('change', sync.reload);
};

/**
 * @memberof Gulp.Sync
 * @function serveDocs
 * @name serveDocs
 * @description
 * Task function that runs local server for documentation
 * @returns {Gulp} - returns Gulp task function
 */
export const serveDocs = () => {
	const data = JSON.parse(
		fs.readFileSync(paths.package, 'utf-8', err => {
			if (err) {
				console.log('🐞 ~ file: sync.js ~ line 32 ~ serveDocs ~ err', err);
			}
		})
	);
	sync({
		notify: false,
		port: 9001,
		server: {
			baseDir: [`${paths.docs}/${data.name}/${data.version}`]
		}
	});
};
