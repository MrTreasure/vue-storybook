const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = (storybookBaseConfig) => {
  const config = storybookBaseConfig.config
  config.resolve.extensions.push('.ts', '.tsx', '.vue', '.css', '.less', '.scss', '.sass', '.html')

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true // used with ForkTsCheckerWebpackPlugin
        },
      }
    ],
  })
  config.module.rules.push({
    test: /\.scss$/,
    use: [
        "style-loader",
        "css-loader",
        "sass-loader"
    ]
  })

  config.plugins.push(new ForkTsCheckerWebpackPlugin())

  return config
}
