const path = require('path');
const webpack = require('webpack');
const webpackBase = require('./webpack.base');
const webpackMerge = require('webpack-merge');

const { mockServer } = require('./utils');

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
		proxy: {
			// 真实环境联调时可以在此配置环境的信息
		},
		overlay: {
			warnings: false,
			errors: true
		},
		historyApiFallback: true
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
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(mode)
		})
	]
});
