/**
 * @namespace CLI.Core
 * @module 'CLI.Core'
 * @description
 * Core of CLI
 */
const Components = require('./classes/components');
const Pages = require('./classes/pages');

const components = new Components();
const pages = new Pages();

const commands = new Map();
commands.set('component', ctx => components.createComponent(ctx));
commands.set('page', ctx => pages.createPage(ctx));

module.exports = commands;
