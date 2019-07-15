const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')
const Components = require('../components.json')

const resolve = dir => path.join(__dirname, '..', dir)

const env = process.env.NODE_ENV === 'testing'
  ? { NODE_ENV: '"testing"' }
  : { NODE_ENV: '"production"' }

module.exports = {
  mode: 'production',
  entry: Components,
  output: {
    path: path.resolve(__dirname, '../lib'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[id].js',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      packages: path.resolve(__dirname, '../packages'),
    }
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    },
    'element-ui': 'element-ui'
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
        test: /\.s(a|c)ss$/,
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
  devtool: '#source-map'
}