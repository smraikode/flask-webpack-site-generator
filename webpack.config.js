// webpack v4const 
path = require('path');// update from 23.12.2018
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

module.exports = {
    mode: process.env.NODE_ENV ,
    entry: { main: './src/index.js' },
    output: {
      path: path.resolve(__dirname, 'src/static/js'),
      filename: 'index.min.js'
    },
    target: 'node', // update from 23.12.2018
    externals: [nodeExternals()], // update from 23.12.2018
    plugins: [
        new MiniCssExtractPlugin({
            filename: '../css/index.min.css',
        }),
        new WebpackShellPluginNext({
            onBuildStart:{
            scripts: ['echo "Webpack Start"'],
            blocking: true,
            parallel: false
            }, 
            onBuildEnd:{
            scripts: ['python src/routers.py'],
            blocking: false,
            parallel: true
            }
        })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
            test: /\.scss$/,
            use: [
              'style-loader',
              MiniCssExtractPlugin.loader,
              'css-loader',
              'sass-loader',
            ],
        },
      ]
    }
};