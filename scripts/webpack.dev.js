const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackBase = require('./webpack.base');
const webpackMerge = require('webpack-merge');
const { mockServer } = require('./utils');

const proxyConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../.proxyconfig'), 'utf-8'));

module.exports = ({ mode, mock }, ...others) => webpackMerge(webpackBase({ mode }, ...others), {
	mode,
	devServer: {
		clientLogLevel: 'warning',
		disableHostCheck: true,
		port: 8000,
		hot: true,
		before: app => mock && mockServer(path.resolve(__dirname, '../mock'), app),
		host: '0.0.0.0',
		contentBase: '../src',
		compress: true,
		proxy: proxyConfig[mode] || {},
		overlay: {
			warnings: false,
			errors: true
		},
		historyApiFallback: {
			rewrites: [
				{ from: /^\/*$/, to: '/index.html' }
			]
		}
	},
	devtool: 'cheap-module-eval-source-map',
	entry: {
		'app': './src/app.js'
	},
	output: {
		publicPath: '/',
		filename: '[name].js'
	},
	bail: true,
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
});
