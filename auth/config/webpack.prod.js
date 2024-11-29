const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");
const commonConfig = require("./webpack.common");
const env = require('dotenv').config().parsed;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: `${env.REACT_APP_PROD_URL}/auth/`,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "auth",
      filename: 'remoteEntry.js',
      exposes: {
            './AuthApp': './src/bootstrap'
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
