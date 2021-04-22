const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "./src/client/index.js"),
  output: {
    path: path.resolve(__dirname, "build/public/assets"),
    filename: "client.dist.js",
    library: {
      name: "WebSocketClient",
      type: "window"
    }
  },
  devServer: {
    contentBase: "./client/",
    inline: true,
    port: 8080
  },
  module: {
    rules: [
      {
        test: /client\/.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(scss)$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions:{
                plugins: function () { // post css plugins, can be exported to postcss.config.js
                  return [
                    require("precss"),
                    require("autoprefixer")
                  ];
                }
              }
            }
          },
          { loader: "sass-loader" }
        ]
      }
    ]
  },
  plugins: [
     new webpack.DefinePlugin({
      "process.env": {
        WEB_SOCKET_URL: JSON.stringify(process.env.WEB_SOCKET_URL)
      }
    })
  ]
};