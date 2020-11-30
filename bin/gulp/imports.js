/**
 * @namespace Gulp.Imports
 * @description
 */
import fs from 'fs';
import path from 'path';
import { context } from '../../gulpfile.babel';

export const imports = filePath => {
	const importFile = path.join(context, filePath);
	const js = () => {
		const ext = filePath.replace('imports.json', 'js');
		return path.join(context, ext);
	};
	const njk = () => {
		const ext = filePath.replace('imports.json', 'njk');
		return path.join(context, ext);
	};
	const sass = () => {
		const ext = filePath.replace('imports.json', 'scss');
		return path.join(context, ext);
	};
	fs.readFile(importFile, 'utf-8', (err, data) => {
		try {
			if (!err) {
				const _data = JSON.parse(data);
				let jsi = '';
				let njki = '';
				let sassi = '';
				for (const [key, value] of Object.entries(_data['components'])) {
					jsi =
						jsi +
						`import ${value.default ? key : `{${key}}`} from '@${value.path}';`;
					njki = njki + `{% from '${value.path}/index.njk' import ${key} %}`;
					sassi = sassi + `@import '../../${value.path}/index.scss';`;
				}
				fs.readFile(js(), 'utf-8', (e, d) => {
					if (!e) {
						d = d.replace(jsi, '');
						const fileData = jsi + '\n' + d;
						fs.writeFile(js(), fileData, we => {
							if (!we) {
								console.log('js imports updated');
							} else {
								console.log(
									'🐞 ~ file: imports.js ~ line 37 ~ fs.writeFile ~ we',
									we
								);
							}
						});
					} else {
						console.log('🐞 ~ file: imports.js ~ line 39 ~ fs.readFile ~ e', e);
					}
				});
				fs.readFile(njk(), 'utf-8', (e, d) => {
					if (!e) {
						d = d.replace(njki, '');
						const fileData = njki + '\n' + d;
						fs.writeFile(njk(), fileData, we => {
							if (!we) {
								console.log('njk imports updated');
							} else {
								console.log(
									'🐞 ~ file: imports.js ~ line 37 ~ fs.writeFile ~ we',
									we
								);
							}
						});
					} else {
						console.log('🐞 ~ file: imports.js ~ line 39 ~ fs.readFile ~ e', e);
					}
				});
				fs.readFile(sass(), 'utf-8', (e, d) => {
					if (!e) {
						d = d.replace(sassi, '');
						const fileData = sassi + '\n' + d;
						fs.writeFile(sass(), fileData, we => {
							if (!we) {
								console.log('scss imports updated');
							} else {
								console.log(
									'🐞 ~ file: imports.js ~ line 37 ~ fs.writeFile ~ we',
									we
								);
							}
						});
					} else {
						console.log('🐞 ~ file: imports.js ~ line 39 ~ fs.readFile ~ e', e);
					}
				});
			}
		} catch (e) {
			console.log('🐞 ~ file: imports.js ~ line 19 ~ fs.readFile ~ e', e);
		}
	});
};
