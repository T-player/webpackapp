'use strict'
const webpack = require('webpack')
const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')

module.exports = merge(baseConfig, {
	devtool: 'eval-cheap-module-source-map',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	]
})