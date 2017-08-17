const path = require('path');
const dashboard = require('webpack-dashboard/plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }]
  },
  output: {
    filename: 'rgb-line.js'
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
    extensions: ['*','.js','.jsx'],
  }
}
