var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './src'
  ],
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { 
        test: /\.js$/,
        include: path.join(__dirname, './src/lib'),
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devServer: {
    contentBase: "./src"
  }
};