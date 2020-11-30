'use strict'
const webpack = require('webpack')
const path = require('path')
const htmlwebpackplugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin')

module.exports = {
	entry: './src/main',
	output: {
		path: path.resolve(__dirname, '../output'),
		filename: '[name].[hash].js'
	},
	resolve: {
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
				use: [
					'style-loader','css-loader', 'postcss-loader'
				]
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					'style-loader','css-loader', 'sass-loader', 'postcss-loader'
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
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
				from: "public",
				to: "public"
			}]
		}),
		new CleanWebpackPlugin(),
	]
}
