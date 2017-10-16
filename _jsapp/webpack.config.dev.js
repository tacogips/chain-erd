import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { TsConfigPathsPlugin } from 'awesome-typescript-loader'


const src = path.resolve(__dirname, 'src')
const dist = path.resolve(__dirname, 'dist')

export default {
  entry: src + '/app.tsx',
  output: {
    path: dist,
    filename: 'bundle.js'
  },
  devtool: "source-map",
  module: {
    loaders: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader: 'awesome-typescript-loader'

    }]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.jsx', '.js'],
    modules: [
			'src',
      'node_modules'
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: src + '/index.html',
      filename: 'index.html'
    })
  ]
}
