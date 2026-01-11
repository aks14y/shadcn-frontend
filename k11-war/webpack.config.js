const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "development",
  devServer: {
    port: 3000,
    historyApiFallback: true,
    headers: {
      "Content-Security-Policy": [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:*", // 'unsafe-eval' needed for webpack dev server
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com", // Allow inline styles with nonce
        "font-src 'self' https://fonts.gstatic.com data:",
        "img-src 'self' data: https:",
        "connect-src 'self' http://localhost:* ws://localhost:* wss://localhost:*",
        "frame-ancestors 'none'",
      ].join("; "),
    },
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.jsx?$/,
        loader: require.resolve("babel-loader"),
        exclude: /node_modules/,
        options: {
          presets: [require.resolve("@babel/preset-react")],
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: "./.env",
      safe: false,
      systemvars: true,
      defaults: false,
    }),
    new ModuleFederationPlugin({
      name: "k11_war",
      filename: "remoteEntry.js",
      remotes: {
        k11_inbox: "k11_inbox@http://localhost:3001/remoteEntry.js",
      },
      exposes: {
        "./DesignSystem": "./src/design-system/index",
        "./Api": "./src/api/index",
        "./SharedContext": "./src/contexts/SharedContext",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: "^18.2.0",
          eager: false,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "^18.2.0",
          eager: false,
        },
        "@mui/material": {
          singleton: true,
          requiredVersion: "^5.14.20",
        },
        "@emotion/react": {
          singleton: true,
          requiredVersion: "^11.11.1",
        },
        "@emotion/styled": {
          singleton: true,
          requiredVersion: "^11.11.0",
        },
        "@emotion/cache": {
          singleton: true,
          requiredVersion: "^11.11.0",
        },
        "styled-components": {
          singleton: true,
          requiredVersion: "^6.2.0",
        },
        "@tanstack/react-query": {
          singleton: true,
          requiredVersion: "^5.90.0",
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
