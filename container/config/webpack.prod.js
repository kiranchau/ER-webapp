const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const env = require('dotenv').config().parsed;
 
const prodConfig = {
      mode: 'production',
      output: {
            filename: '[name].[contenthash].js'
      },
      plugins: [
            new ModuleFederationPlugin({
                  name:'container',
                  remotes: {
                        auth: `auth@${env.REACT_APP_PROD_URL}/auth/remoteEntry.js`,
                        dashboard: `dashboard@${env.REACT_APP_PROD_URL}/dashboard/remoteEntry.js`,
                  },
                  shared: packageJson.dependencies,
            })
      ]
};
 
module.exports = merge(commonConfig, prodConfig)