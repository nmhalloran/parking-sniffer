const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./client/src/index.js",
  output: {
    path: path.resolve(__dirname),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx", "*"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          query: {
            presets: ["es2015","env", "react"]
          }
        }
      },
      {
     test: /\.css$/,
     exclude: /node_modules/,
     loader: [ 'css-loader']
   },
   { test: /\.(png|jpg|gif)$/, loader: "url-loader?mimetype=image/png" }
    ]
  },
  devtool: "source-map"
};
