'use strict'
const devMode = process.env.NODE_ENV !== 'production';
const webpack = require('webpack')
const path = require('path')
const htmlwebpackplugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssloader = {
	loader: 'postcss-loader',
	options: {
		postcssOptions: {
			plugins: [
				require('autoprefixer')({
					"overrideBrowserlist": [">0.25%", "not dead"]
				})
			]
		}
	}
}

module.exports = {
	entry: './src/main',
	output: {
		path: path.resolve(__dirname, '../output'),
		filename: '[name].[hash].js'
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			'@': path.resolve(__dirname, '../src')
		}
	},
	devServer: {
		contentBase: path.join(__dirname, "../output"),
		compress: true,
		host: 'localhost',
		port: 9000,
		open: false,
	},
	module: {
		rules: [{
				test: /\.(png|jpe?g|gif)$/i,
				use: [{
					loader: 'url-loader',
				}, ],
			},
			{
				test: /\.css$/i,
				exclude: /node_modules/,
				use: [
					devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', postcssloader
				]
			},
			{
				test: /\.s[ac]ss$/i,
				exclude: /node_modules/,
				use: [
					'style-loader', 'css-loader', 'sass-loader', postcssloader
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: [
							[
								"@babel/plugin-transform-runtime",
								{
									"corejs": 3
								}
							]
						]

					}
				}
			},
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'ts-loader',
					options: {
						configFile: path.resolve(__dirname, '../tsconfig.json'),
					},
				}
			},
		]
	},
	plugins: [
		new htmlwebpackplugin({
			title: 'fullapp',
			template: path.resolve(__dirname, '../src/index.html'),
			filename: 'index.html'
		}),
		new CopyPlugin({
			patterns: [{
				from: path.resolve(__dirname, '../public'),
				to: path.resolve(__dirname, '../output/public')
			}]
		}),
		
	]
}
