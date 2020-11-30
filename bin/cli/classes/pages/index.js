/**
 * @namespace CLI
 * @module 'CLI.Pages'
 * @description
 * Module that contain CLI commands for components
 */
const inq = require('inquirer');
const path = require('path');
const fs = require('fs');

/**
 * @class
 * @memberof CLI
 * @name Pages
 * @description
 * Class that creates components
 */
class Pages {
	/**
	 * @private
	 * @method njk
	 * @param {string} name - Name of the page
	 * @returns {string} - template of njk file of the page
	 */
	njk(name) {
		return `
{# Page :: ${name} #}

{% extends 'layouts/default.njk' %}

{% block styles %}
<link rel="stylesheet" href="css/${name}.css">
{% endblock %}

{% block main %}
<main>
	<h1>hello</h1>
</main>
{% endblock %}

{% block scripts %}
<script src="scripts/${name}.bundle.js"></script>
{% endblock %}
`;
	}

	/**
	 * @private
	 * @method js
	 * @param {string} name - Name of the page
	 * @returns {string} - template of js file of the page
	 */
	js(name) {
		return `
/**
 * @module PAGES/${name}
 * @name ${name}
 */
`;
	}

	/**
	 * @private
	 * @method sass
	 * @param {string} name - Name of the page
	 * @returns {string} - template of sass file of the page
	 */
	sass(name) {
		return `
/** Page :: ${name} **/
`;
	}

	/**
	 * @private
	 * @method prompt
	 * @returns {{ name: string }} - answers from prompt
	 */
	prompt() {
		const questions = [
			{
				name: 'name',
				type: 'input',
				message: '👋: Введи название страницы:'
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
	 * @method createPage
	 * @param {string} ctx - context of CLI
	 * @returns {void}
	 */
	async createPage(ctx) {
		const { name } = await this.prompt();
		const validName = name.replace('-', '_') || name.replace(' ', '_');
		const dest = path.join(ctx, `/pages/${validName}`);
		const extensions = ['js', 'scss', 'njk'];
		const methods = {
			js: name => this.js(name),
			scss: name => this.sass(name),
			njk: name => this.njk(name)
		};

		const createFile = ext =>
			fs.mkdir(dest, { recursive: true }, err => {
				if (!err) {
					fs.writeFile(
						`${dest}/${validName}.${ext}`,
						methods[ext](validName),
						e => {
							if (!e) {
								console.log(`😼: Страница ${validName} успешно создан!`);
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
			fs.readFile(`${dest}/${validName}.${ext}`, 'utf-8', async (err, data) => {
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

module.exports = Pages;
