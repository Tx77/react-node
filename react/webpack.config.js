const path = require("path");
const HtmlwebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV === "production";
const resolvePath = inputPath => path.resolve(__dirname, inputPath);

let webpackConfig = {
  mode: isProd ? "production" : "development",
  stats: "minimal",
  entry: {
    app: [resolvePath("./src/main.js")]
  },
  output: {
    filename: "[name].[hash:8].js",
    path: isProd ? resolvePath("../react-dist") : resolvePath("dist"),
    publicPath: "/"
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: {
      views: resolvePath("src/views"),
      components: resolvePath("src/components"),
      layout: resolvePath("src/layout"),
      style: resolvePath("src/style"),
      router: resolvePath("src/router")
    }
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        loader: "babel-loader"
      },
      {
        test: /\.less$/,
        use: [
          "css-loader",
          "less-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
        ]
      },
      {
        test: /\.(html|tpl)$/,
        use: [
          "html-withimg-loader"
        ]
      },
      {
        test: /\.html$/,
        use: [
          "html-loader"
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // 小于8k的图片自动转成base64格式
              outputPath: "images/" // 图片打包后的文件夹
            }
          }
        ]
      },
      {
        test: /\.(gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [
          {
            loader: isProd ? MiniCssExtractPlugin.loader : "file-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    // 输出 index.html 到 output
    new HtmlwebpackPlugin({
      template: resolvePath("index.html")
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
};

if (isProd) {
  webpackConfig.plugins.push(
    // 每次 build 清空 output 目录
    new CleanWebpackPlugin(resolvePath("../react-dist"))
  );
  webpackConfig.plugins.push(
    // 分离单独的 CSS 文件到 output
    new MiniCssExtractPlugin({
      filename: "style.css"
    })
  );
}

module.exports = webpackConfig;
