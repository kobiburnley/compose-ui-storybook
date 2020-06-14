import * as path from "path"
import { DefinePlugin, HashedModuleIdsPlugin, Configuration } from "webpack"

// const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer")

module.exports = {
  mode: "development",
  target: "node",
  devtool: "hidden-source-map",
  entry: {
    app: ["./src/server/app.ts"],
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
    library: "app",
    libraryTarget: "commonjs2",
    path: path.join(__dirname, "src", "server"),
    publicPath: "/",
    filename: "[name].webpack.module.js",
  },
  plugins: [
    // new HashedModuleIdsPlugin(),
    // new DefinePlugin({
    // "process.env.NODE_ENV": JSON.stringify("production"),
    // }),
    // new BundleAnalyzerPlugin()
  ],
} as Configuration
 