'use strict'
process.env.NODE_ENV = 'production'
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin')
const {
	merge
} = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = merge(baseConfig, {
	mode: 'production',
	devtool: 'cheap-module-source-map',
	optimization: {
		usedExports:true,
		minimize: true,
		minimizer: [new TerserPlugin({
			parallel: true,
			terserOptions: {
				ecma: 5,
				ie8: false,
				compress: {
					unused: true,
					dead_code:true,
					drop_debugger: true,
					// drop_console: true,
				},
				sourceMap: true,
			},
		})],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
		new CleanWebpackPlugin(),
	],

})
