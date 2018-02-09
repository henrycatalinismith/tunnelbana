const path = require("path");

const isStorybook = !!process.argv.filter(arg => arg.match(/start-storybook$/)).length;
if (isStorybook) {
  module.exports = require("./webpack.storybook.js");
  return;
}
//console.log(isStorybook);
//process.exit(-1);

const Dashboard = require("webpack-dashboard");
const DashboardPlugin = require("webpack-dashboard/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

const plugins = [
  new HtmlWebpackPlugin({
    title: "highvalley",
    hash: true,
    template: "./entrypoints/index.ejs",
    filename: "index.html"
  }),
  new ExtractTextPlugin({
    filename: "highvalley.[hash].css",
  }),
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
  devtool: "source-map",
  entry: [
    path.join(__dirname, "../entrypoints", "index.js"),
    path.join(__dirname, "../entrypoints", "index.scss"),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: { compact: false }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader",
              options: {
                includePaths: [
                  path.join(__dirname, "../stylesheets"),
                ]
              }
            }
          ]
        })
      }
    ]
  },
  output: {
    filename: "highvalley.[hash].js",
    path: path.join(__dirname, "../artefacts"),
  },
  plugins,
  resolve: {
    modules: [__dirname, "../", "../node_modules"],
    extensions: ["*", ".js", ".jsx"]
  }
};


