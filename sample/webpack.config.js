const path = require("path");
const MyWebpackPlugin = require("./my-webpack-plugin");
const webpack = require("webpack");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: [path.resolve("./my-webpack-loader.js")],
      // },

      // loader 실습
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          "css-loader",
        ], // css 파일을 처리해주면서 에러 없어짐
      },
      {
        test: /\.png|jpg|svg|gif$/,
        loader: "url-loader",
        options: {
          // publicPath: "./",
          name: "[name].[ext]?[hash]",
          limit: 300000, // 200kb미만은 js문자열로 , 그 이상은 파일복사
        },
      },

      //
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `
      BuildDate  : ${new Date().toLocaleString()},
      Author : ${childProcess.execSync("git config user.name")}
      `,
    }),

    new webpack.DefinePlugin({
      VERSION: JSON.stringify("v.1.2.3"),
      PRODUCTION: JSON.stringify(false),
      MAX_COUNT: JSON.stringify(999),
      "api.domain": JSON.stringify("http://dev.api.domain.com"),
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        env: process.env.NODE_ENV === "development" ? "개발용" : "",
        minify: {
          collapseWhitespace: true,
          removeComments: true,
        },
      },
    }),

    new CleanWebpackPlugin(),
    // 개발환경에서는 굳이 따로 다운로드 받을 필요는 없으므로
    ...(process.env.NODE_ENV === "production"
      ? [new MiniCssExtractPlugin({ filename: "[name].css" })]
      : []),
  ],
};
