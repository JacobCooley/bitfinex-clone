const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
module.exports = {
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader"
					}
				]
			},
			{
				test: /\.(scss|css)$/,
				use: [
					'css-hot-loader',
					"style-loader",
					"css-loader",
					"sass-loader"
				]
			},
			{
				test: /\.(jpe?g|gif|png|svg)$/,
				use: {
					loader: 'file-loader?name=assets/icons/[name].[ext]'
				}
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'fonts/'
					}
				}]
			}
		]
	},
	devServer: {
		historyApiFallback: true,
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html"
		})
	],
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			app: path.resolve(__dirname, 'src/modules/app'),
			assets: path.resolve(__dirname, 'src/assets/'),
			component: path.resolve(__dirname, 'src/modules/common/components/'),
			modules: path.resolve(__dirname, 'src/modules/'),
			common: path.resolve(__dirname, 'src/modules/common/'),
			functions: path.resolve(__dirname, 'src/utils/functions/'),
			home: path.resolve(__dirname, 'src/modules/home/'),
			styles: path.resolve(__dirname, 'src/modules/common/styles'),
			utils: path.resolve(__dirname, 'src/utils')
		}
	}
};