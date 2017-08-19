const path = require('path');
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const dashboard = new Dashboard;

module.exports = {
  devServer: {
    // contentBase: path.join(__dirname, 'src'),
    compress: true,
    historyApiFallback: true,
    port: 8080,
    host: '127.0.0.1',
    // inline: true,
    quiet: true,   // important
    // hot: true,
    open: true,
  },
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
  plugins: [
    new DashboardPlugin({
      port: 8080,
      handler: dashboard.setData,
    }),
  ],
  resolve: {
    modules: [__dirname, 'node_modules'],
    extensions: ['*','.js','.jsx'],
  }
}
