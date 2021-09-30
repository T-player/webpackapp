'use strict'
const devMode = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SizePlugin = require('size-plugin');
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
		filename: '[name].[chunkhash].js',
		chunkFilename: 'js/[name][chunkhash]',
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			'@': path.resolve(__dirname, '../src')
		}
	},
	optimization: {
		runtimeChunk: {
			name: 'runtime'
		},
		splitChunks: {
			chunks: 'all',
			minSize: 30000,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				},
				lodash: {
					name: 'chunk-lodash',
					priority: 20,
					test: /[\\/]node_modules[\\/]lodash[\\/]/
				}
			}
		}
	},
	module: {
		rules: [{
				test: /\.(png|jpe?g|gif)$/i,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 20480
					}
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
						presets: ['@babel/preset-env', '@babel/preset-react'],
						plugins: [
							[
								"@babel/plugin-transform-runtime",
								{
									"corejs": 3,
									"useBuildIn": "usage"
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
		new SizePlugin(),
		new htmlWebpackPlugin({
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
