const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')
const Components = require('../components.json')

const resolve = dir => path.join(__dirname, '..', dir)

const env = process.env.NODE_ENV === 'testing'
  ? { NODE_ENV: '"testing"' }
  : { NODE_ENV: '"production"' }

module.exports = {
  entry: Components,
  mode: 'production',
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader' 
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              transpileOnly: true
            },
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
            "style-loader",
            "css-loader",
            "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    new CheckerPlugin(),
    new ForkTsCheckerWebpackPlugin()
  ],
  output: {
    path: path.resolve(__dirname, '../lib'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[id].js',
    libraryTarget: 'commonjs2'
  },
  devtool: '#source-map',
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      packages: path.resolve(__dirname, '../packages'),
    }
  }
}