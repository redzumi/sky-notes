const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: [
    '@babel/polyfill',
    path.resolve(__dirname, '../../src/vendors.js'),
    path.resolve(__dirname, '../../src/index.jsx'),
  ],
  output: {
    path: path.resolve(__dirname, '../../build'),
    filename: 'bundle.[hash].js',
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
        include: /[\\/]node_modules[\\/]/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.css$/,
        exclude: /[\\/]node_modules[\\/]/,
        use: [
          MiniCssExtractPlugin.loader,
          // eslint-disable-next-line
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../../src/index.html'),
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
  watchOptions: {
    aggregateTimeout: 150,
    poll: 500,
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../../build'),
    compress: true,
    disableHostCheck: true,
  },
  devtool: 'cheap-module-eval-source-map',
};
