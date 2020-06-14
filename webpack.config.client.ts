import * as HtmlWebpackPlugin from "html-webpack-plugin"
import * as path from "path"
import { DefinePlugin, HashedModuleIdsPlugin, Configuration } from "webpack"

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    app: ["./src/client/app.ts"]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ["source-map-loader"],
        enforce: "pre",
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: path.resolve(__dirname, "./tsconfig.build.json"),
          transpileOnly: true,
        },
      },
      {
        test: /\.s[ac]ss$/i,
        include: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                exportGlobals: true,
                localIdentName: "[local]",
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              webpackImporter: false,
              sassOptions: {
                includePaths: ["./node_modules"],
              },
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              webpackImporter: false,
              sassOptions: {
                includePaths: ["./node_modules"],
              },
            },
          },
        ],
      },
    ],
  },
  output: {
    path: path.join(__dirname, "public"),
    // filename: "[name].[contenthash].js",
    filename: "[name].js",
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all"
    },
  },
  plugins: [
    new HashedModuleIdsPlugin(),
    // new HtmlWebpackPlugin(),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
    // new BundleAnalyzerPlugin()
  ]
} as Configuration
