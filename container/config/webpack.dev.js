const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");
const env = require('dotenv').config().parsed;

const devConfig = {
  mode: "development",
  output: {
    publicPath: env.REACT_APP_CONTAINER_DEV_URL,
  },
  devServer: {
    port: 8080,
    historyApiFallback: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      filename: "remoteEntry.js",
      remotes: {
        auth: `auth@${env.REACT_APP_AUTH_DEV_URL}/remoteEntry.js`,
        dashboard: `dashboard@${env.REACT_APP_DASHBOARD_DEV_URL}/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
