const HtmlWebpackPlugin = require("html-webpack-plugin"); //installed via npm

const webpack = require("webpack"); //to access built-in plugins
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackRTLPlugin = require("webpack-rtl-plugin");
const extractSass = new ExtractTextPlugin({
  filename: "style.[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader"
            }
          ],
          // use style-loader in development
          fallback: "style-loader"
        })
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    
    extractSass,
    new WebpackRTLPlugin({
      filename: "style.[contenthash].rtl.css",
      options: {},
      plugins: [],
      diffOnly: false,
      minify: true
    }),
    new HtmlWebpackPlugin({
      mobile: true,
    })
  ],
  devServer: {
    port: 3000,
    open: true // this is point option
  }
};

module.exports = config;
