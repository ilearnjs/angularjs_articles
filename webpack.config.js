const ProvidePlugin = require('webpack').ProvidePlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		angular: `${__dirname}/bundles/angular.js`,
		rx: `${__dirname}/bundles/rx.js`,
		app: `${__dirname}/bundles/app.js`,
	},

	output: {
		path: `${__dirname}/dist`,
		filename: '[name].js',
		publicPath: '/',
	},

	module: {
		rules: [
			{
				test: /\.html$/,
				loader: "html-loader"
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: `${__dirname}/src/index.html`
		}),
		new ProvidePlugin({
			'Rx': 'rxjs/Rx',
		})
	],

	devServer: {
		contentBase: `${__dirname}/dist`,
	},

	devtool: 'source-map'
};