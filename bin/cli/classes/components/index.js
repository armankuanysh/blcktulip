/**
 * @namespace CLI
 * @module 'CLI.Components'
 * @description
 * Module that contain CLI commands for components
 */
const inq = require('inquirer');
const path = require('path');
const fs = require('fs');

/**
 * @class
 * @memberof CLI
 * @name Components
 * @description
 * Class that creates components
 */
class Components {
	/**
	 * @private
	 * @method njk
	 * @param {string} name - Name of the component
	 * @param {string} type - Type of the component
	 * @returns {string} - template of njk file of the component
	 */
	njk(name, type) {
		return `
{# ${type.toUpperCase()} component :: ${name} #}

{% macro ${name}() %}
{% endmacro %}
`;
	}

	/**
	 * @private
	 * @method js
	 * @param {string} name - Name of the component
	 * @param {string} type - Type of the component
	 * @returns {string} - template of js file of the component
	 */
	js(name, type) {
		return `
/**
 * @module COMPONENTS/${type.toUpperCase()}/${name}
 * @name ${name}
 */

/**
 * @function ${name}
 * @returns {void}
 */
export function ${name}() {}
`;
	}

	/**
	 * @private
	 * @method sass
	 * @param {string} name - Name of the component
	 * @param {string} type - Type of the component
	 * @returns {string} - template of sass file of the component
	 */
	sass(name, type) {
		return `
/** ${type.toUpperCase()} component :: ${name} **/
`;
	}

	/**
	 * @private
	 * @method prompt
	 * @returns {{ type: string, name: string }} - answers from prompt
	 */
	prompt() {
		const questions = [
			{
				name: 'type',
				type: 'list',
				message: '😼: Компонент какого типа нужен?',
				choices: [
					{
						value: 'atoms'
					},
					{
						value: 'moleculus'
					},
					{
						value: 'organisms'
					},
					{
						value: 'template'
					}
				]
			},
			{
				name: 'name',
				type: 'input',
				message: '👋: Введи название компонента:'
			}
		];
		return inq.prompt(questions);
	}

	/**
	 * @private
	 * @method askForRewrite
	 * @returns {{ rewrite: string }} - answers from prompt
	 */
	askForRewrite() {
		return inq.prompt([
			{
				name: 'rewrite',
				type: 'list',
				message: '😺: Кажись, такой компонент уже есть, переписать компонент?',
				choices: [
					{
						value: 'nope'
					},
					{
						value: 'yup'
					}
				]
			}
		]);
	}

	/**
	 * @public
	 * @method createComponent
	 * @param {string} ctx - context of CLI
	 * @returns {void}
	 */
	async createComponent(ctx) {
		const { type, name } = await this.prompt();
		const validName = name.replace('-', '_') || name.replace(' ', '_');
		const dest = path.join(ctx, `/components/${type}/${validName}`);
		const extensions = ['js', 'scss', 'njk'];
		const methods = {
			js: (name, type) => this.js(name, type),
			scss: (name, type) => this.sass(name, type),
			njk: (name, type) => this.njk(name, type)
		};

		const createFile = ext =>
			fs.mkdir(dest, { recursive: true }, err => {
				if (!err) {
					fs.writeFile(
						`${dest}/index.${ext}`,
						methods[ext](validName, type),
						e => {
							if (!e) {
								console.log(`😼: Компонент ${validName} успешно создан!`);
							} else {
								console.log('😿: Oops! Что-то пошло не так', e);
							}
						}
					);
				} else {
					console.log('😿: Oops! Что-то пошло не так', err);
				}
			});

		extensions.forEach(ext => {
			fs.readFile(`${dest}/index.${ext}`, 'utf-8', async (err, data) => {
				if (!err) {
					if (data) {
						const { rewrite } = await this.askForRewrite();
						if (rewrite === 'yup') {
							createFile(ext);
						} else {
							console.log('😸: Оке');
							process.exit(1);
						}
					} else {
						createFile(ext);
					}
				} else {
					createFile(ext);
				}
			});
		});
	}
}

module.exports = Components;
