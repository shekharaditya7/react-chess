const path = require("path");
const pkg = require("./package.json");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/Chess/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    library: pkg.name,
    libraryTarget: "commonjs2",
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|jpg|gif|webp)$/i,
        use: {
          loader: "url-loader",
          options: {
            limit: 8192,
          },
        },
      },
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
};
