const path = require("path");

const Dashboard = require("webpack-dashboard");
const DashboardPlugin = require("webpack-dashboard/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");

const plugins = [
  new HtmlWebpackPlugin({
    title: "tunnelbana.github.io",
    hash: true,
    template: "index.ejs"
  }),
  new HtmlWebpackIncludeAssetsPlugin({
    assets: ["index.css"],
    append: true
  })
];

if (process.env.DASH) {
  plugins.push(
    new DashboardPlugin({
      port: 8080,
      handler: new Dashboard().setData
    })
  );
}

module.exports = {
  devServer: {
    compress: true,
    historyApiFallback: true,
    port: 8080,
    host: "127.0.0.1",
    quiet: true,
    open: true
  },
  entry: path.join(__dirname, "index.js"),
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader"
      },
      {
        test: /\.svg/,
        loader: "raw-loader"
      }
    ]
  },
  output: {
    filename: "tunnelbana.js"
  },
  plugins,
  resolve: {
    modules: [__dirname, "node_modules"],
    extensions: ["*", ".js", ".jsx"]
  }
};
