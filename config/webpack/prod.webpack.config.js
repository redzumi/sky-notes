const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: [
    '@babel/polyfill',
    path.resolve(__dirname, '../../src/vendors.js'),
    path.resolve(__dirname, '../../src/index.jsx'),
  ],
  output: {
    path: path.resolve(__dirname, '../../build/assets'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        exclude: /(node_modules)/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../../src/index.html'),
      filename: '../index.html',
    }),
    new WriteFilePlugin(),
    new ProgressBarPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'third_party',
          chunks: 'all',
        },
      },
    },
  },
};
