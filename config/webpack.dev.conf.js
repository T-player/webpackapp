'use strict'
const webpack = require('webpack')
const path = require('path')
const {
	merge
} = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')

const mergeConfig = merge(baseConfig, {
	mode: 'development',
	devtool: 'eval-cheap-module-source-map',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		contentBase: path.join(__dirname, "../output"),
		compress: true,
		host: 'localhost',
		port: 9000,
		open: false,
		historyApiFallback: true,
		proxy: {
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
				"Access-Control-Allow-Headers": "X-Requested-With,Content-Type,Accept,Authorization"
			},
			'api': {
				target: 'http://localhost:3000',
				changeOrigin: true,
				secure: false,
				quiet: true,
				bypass: function(req, res, proxyOption) {
					if (req.headers.accept.indexOf('html') !== -1) {
						console.log('Skipping proxy for browser request.');
						return '../src/index.html';
					}
				}
			},
		}
	},
})

module.exports = mergeConfig;
