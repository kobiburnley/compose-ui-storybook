import * as path from "path"
import * as ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import * as os from "os"
import {Configuration} from "webpack"

module.exports = ({ config }: {config: Configuration}) => {
  config.module!.rules.push({
    test: /\.(ts|tsx)$/,
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
          configFile: path.resolve(__dirname, "../tsconfig.build.json"),
          transpileOnly: true,
        },
      },
    ],
  })


  config.module!.rules.push({
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
  })

  config.module!.rules.push({
    test: /\.s[ac]ss$/i,
    exclude: /node_modules/,
    use: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          modules: true
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
  })

  config.resolve!.extensions!.push(".ts", ".tsx", ".scss")

  config.plugins!.push(
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(__dirname, "../tsconfig.build.json"),
    })
  )

  ;(config as any).devServer = {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }

  if (os.type() === "Linux") {
    config.watchOptions = {
      poll: true,
    }
  }

  return config
}
