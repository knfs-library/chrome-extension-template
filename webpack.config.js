const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require('fs');
const dotenv = require('dotenv');

const env = process.env.NODE_ENV
const envFile = dotenv.parse(fs.readFileSync(`.env.${env}`));
const envVariables = Object.keys(envFile).reduce((acc, key) => {
	acc[`process.env.${key}`] = JSON.stringify(envFile[key]);
	return acc;
}, {});

const distName = env === "production" ? "dist_production" : "dist"

module.exports = {
	mode: "development",
	entry: {
		background: "./src/background.js",
		content: "./src/content.js",
		popup: "./src/modules/popup/script.js",
		setting: "./src/modules/setting/script.js",
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, distName),
	},
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.css$/,
				include: /node_modules/,
				use: [
					"style-loader",
					"css-loader"
				],
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader"
				],
				},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name][ext]'
				}
			}
		],
	},
	plugins: [
		new webpack.DefinePlugin(envVariables),
		new MiniCssExtractPlugin({
			filename: "css/[name].css",
		}),
		new HtmlWebpackPlugin({
			template: './src/modules/popup/index.html',
			filename: 'popup.html',
			chunks: ['popup'],
		}),
		new HtmlWebpackPlugin({
			template: './src/modules/setting/index.html',
			filename: 'setting.html',
			chunks: ['setting'],
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, `public/manifest.${process.env.NODE_ENV}.json`),
					to: path.resolve(__dirname, `${distName}/manifest.json`),
				},
				{
					from: path.resolve(__dirname, 'public'),
					to: path.resolve(__dirname, `${distName}`),
					globOptions: {
						ignore: ['**/manifest.*.json'],
					},
				},
			],
		}),
	],
	resolve: {
		fallback: {
			fs: false,
			path: require.resolve("path-browserify"),
		},
	},
	experiments: {
		asyncWebAssembly: true,
		topLevelAwait: true
	},
	optimization: {
		minimize: process.env.NODE_ENV === "production",
		minimizer: process.env.NODE_ENV === "production" ? [
			new CssMinimizerPlugin(),
			new TerserWebpackPlugin({
				terserOptions: {
					compress: {
						drop_console: true,
					},
				},
			}),
		] : [],
	},
	devtool: 'source-map',
};
