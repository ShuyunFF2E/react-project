const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { description } = require('../package.json');
const { version } = require('react/package.json');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const srcPath = path.resolve('./src');
const dirs = fs.readdirSync(srcPath);

const alias = dirs.reduce((acc, dir) => {
	const fullPath = path.join(srcPath, dir);
	const stats = fs.statSync(fullPath);

	if(stats.isDirectory()) {
		acc[`@${dir}`] = fullPath
	}
	return acc;
}, { '@src': srcPath });

module.exports = ({ mode }) => ({
	resolve: {
		alias: {
			...alias,

			// 避免业务组件库和业务代码引用的cloud-react版本不一致问题
			'cloud-react': path.resolve('./node_modules/cloud-react'),
		},
		modules: [path.resolve(__dirname, './src'), 'node_modules'],
		extensions: ['.js', '.jsx']
	},
	resolveLoader: {
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
				test: /\.less$/,
				use: [
					mode !== 'production' ? 'style' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							localsConvention: 'camelCase',
							modules: {
								localIdentName: '[local]-[hash:base64:5]',

							},
							sourceMap: mode !== 'production'
						}
					},
					{
						loader: 'less-loader',
						options: {
							sourceMap: true
						}
					}
				],
				include: [
					path.resolve(__dirname, '../src'),
					path.resolve(__dirname, '../node_modules')
				]
			},
			{
				test: /\.css$/,
				use: ['style', 'css']
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
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(mode)
		}),
		new HtmlWebpackPlugin({
			env: mode,
			base: './',
			reactVersion: version,
			title: description,
			filename: 'index.html',
			template: './src/index.html',
			inject: true,
			minify: mode === 'production'
		}),
		new webpack.ProgressPlugin()
	]
});
