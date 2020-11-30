const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
const context = path.resolve(__dirname, 'src');
const entry = require(`${context}/index.js`);
const mode = process.env.PROJECT_MODE;

const JSLoaders = () => {
	const loaders = [
		{
			loader: 'babel-loader',
			options: {
				presets: [
					[
						'@babel/preset-env',
						{
							corejs: 3,
							useBuiltIns: 'entry',
							targets: {
								esmodules: true
							}
						}
					]
				]
			}
		},
		'eslint-loader'
	];
	return loaders;
};

const CONFIG = {
	mode,
	context,
	entry,
	output: {
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: JSLoaders()
			},
			{
				test: /\.ts|.tsx/,
				loader: 'ts-loader'
			}
		]
	},
	resolve: {
		alias: {
			'@': path.join(__dirname, 'src'),
			'@components': path.join(__dirname, 'src/components'),
			'@pages': path.join(__dirname, 'src/pages'),
			'@assets': path.join(__dirname, 'src/assets')
		}
	}
};

module.exports = CONFIG;
