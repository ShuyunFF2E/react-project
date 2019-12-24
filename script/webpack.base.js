const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { description } = require('../package.json');
const { version } = require('react/package.json');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = ({ mode }) => ({
	resolveLoader: {
		modules: ['node_modules'],
		moduleExtensions: ['-loader']
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: ['babel'],
				exclude: /node_modules/
			},
			{
				test: /\.(c|le)ss$/,
				use: [
					mode !== 'production'
						? 'style'
						: MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[local]-[hash:base64:5]',
							},
							sourceMap: mode !== 'production'
						}
					},
					'less'
				],
				include: [
					path.resolve(__dirname, '../src'),
					path.resolve(__dirname, '../node_modules')
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url',
				options: {
					limit: 10000,
					name: '[name]-[hash:5].[ext]'
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			env: mode,
			base: './',
			reactVersion: version,
			title: description,
			filename: 'index.html',
			template: './src/index.html',
			inject: true,
			minify: mode === 'production'
		})
	]
});
