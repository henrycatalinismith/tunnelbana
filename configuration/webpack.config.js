const path = require("path");
const _ = require("lodash");

const mode = !!process.argv.filter(arg => arg.match(/start-storybook$/)).length
  ? "storybook"
  : !!process.argv.filter(arg => arg.match(/webpack-dev-server$/)).length
  ? "dashboard"
  : "build";

const babel = () => {
  return {
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: /(node_modules|bower_components)/,
          //query: { compact: false }
        },
      ]
    },
  };
};

const resolve = () => {
  return {
    resolve: {
      modules: [__dirname, "../", "../node_modules"],
      extensions: ["*", ".js", ".jsx"]
    }
  };
};

const entry = () => {
  return {
    entry: [
      path.join(__dirname, "../entrypoints", "index.js"),
      path.join(__dirname, "../entrypoints", "index.scss"),
    ],
    output: {
      filename: "highvalley.[hash].js",
      path: path.join(__dirname, "../artefacts"),
    },
  };
};

const html = () => {
  const HtmlWebpackPlugin = require("html-webpack-plugin");
  const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");

  return {
    plugins: [
      new HtmlWebpackPlugin({
        title: "highvalley",
        hash: true,
        template: "./entrypoints/index.ejs",
        filename: "index.html"
      }),
    ]
  };
};

const sass = () => {
  const ExtractTextPlugin = require("extract-text-webpack-plugin");

  return {
    module: {
      loaders: [{
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
      }]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: "highvalley.[hash].css",
      }),
    ]
  };
};

const dashboard = () => {
  const Dashboard = require("webpack-dashboard");
  const DashboardPlugin = require("webpack-dashboard/plugin");

  return {
    devtool: "source-map",
    devServer: {
      compress: true,
      historyApiFallback: true,
      port: 8080,
      host: "127.0.0.1",
      quiet: true,
      open: false,
    },
    plugins: [
      new DashboardPlugin({
        port: 8080,
        handler: new Dashboard().setData
      })
    ]
  };
};

const merge = (...config) => {
  const concat = (src, dst) => _.isArray(src) ? src.concat(dst) : undefined;
  return _.mergeWith.apply(null, config.concat(concat));
};

const config = ({

  build: () => merge(
    babel(),
    resolve(),
    html(),
    sass(),
    entry()
  ),

  dashboard: () => merge(
    babel(),
    resolve(),
    html(),
    sass(),
    entry(),
    dashboard()
  ),

  storybook: () => merge(
    babel()
  ),

})[mode]();

module.exports = config;
