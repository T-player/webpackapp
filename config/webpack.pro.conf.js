'use strict'
process.env.NODE_ENV = 'production'
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CssNano = require('cssnano');
const {
	merge
} = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const mergeConfig = merge(baseConfig, {
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
		}),
		// css文件压缩
		new OptimizeCSSAssetsPlugin({
			assetNameRegExp: /\.(sa|sc|c)ss$/g,
			cssProcessor: CssNano,
			cssProcessorOptions: {
				safe: true,
				discardComments: { removeAll: true }, //移除css注释
				normalizeUnicode: false //建议false,否则在使用unicode-range的时候会产生乱码
			},
			canPrint: true,
		})],
	},
	plugins: [
		// css文件单独提出
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
		new BundleAnalyzerPlugin(),
		new CleanWebpackPlugin(),
	],

})
module.exports = mergeConfig
