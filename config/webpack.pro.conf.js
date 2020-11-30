'use strict'
const webpack = require('webpack')
const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = merge(baseConfig, {
	mode: 'production',
	devtool: 'eval-cheap-source-map',
	plugins: [
		// new UglifyJsPlugin({
		// 	test: /\.js($|\?)/i,
		// 	exclude: /node_modules/,
		// 	uglifyOptions: {
		// 		compress: {
		// 			drop_console: true,
		// 			warnings: false
		// 		}
		// 	},
		// 	sourceMap: true,
		// }),
	],
	
})