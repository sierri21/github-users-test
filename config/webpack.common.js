const pathtoresolve = require('path');
const paths = require('./paths')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: [ 'whatwg-fetch', paths.src + '/index.js'],

  resolve: {
    extensions: [ '.js', '.vue' ],
    alias: {
      'components': pathtoresolve.resolve(__dirname, '../src/components/'),
    }
  },
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: paths.src + '/index.html',
      filename: 'index.html',
    }),
  ],
  module: {
    rules: [
      {test: /\.vue$/, loader: 'vue-loader' },
      {test: /\.js$/, exclude: /node_modules/, use: ['babel-loader']},
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {sourceMap: true, importLoaders: 1}},
          {loader: 'postcss-loader', options: {sourceMap: true}},
          {loader: 'sass-loader', options: {sourceMap: true}},
        ],
      }
    ],
  },
}
