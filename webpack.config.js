const MiniCssExtractPlugin       = require('mini-css-extract-plugin')
const HtmlWebpackPlugin          = require('html-webpack-plugin')
const {CleanWebpackPlugin}       = require('clean-webpack-plugin')
const TerserJSPlugin             = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin    = require('optimize-css-assets-webpack-plugin')
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default
const PurgecssPlugin             = require('purgecss-webpack-plugin')

const glob = require('glob')

const path = require('path')
const ROOT = path.resolve(__dirname, 'src')

module.exports = (env, argv) => ({
  context     : ROOT,
  entry       : ['./application.scss', './application.mjs'],
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },
  module      : {
    rules: [
      {
        test: /\.scss$/,
        use : [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ]
      }, {
        test: /\.(html)$/,
        use : [
          'html-loader'
        ]
      }, {
        type   : 'javascript/auto',
        test   : /\.(jpg|png|gif|svg|json)$/,
        exclude: /test\/stubs\/.+$/,
        use    : {
          loader : 'file-loader',
          options: {
            name      : '[hash:8].[ext]',
            outputPath: 'assets',
            publicPath: 'assets/'
          }
        }
      }
    ]
  },
  plugins     : [
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      hash    : true,
      minify  : argv.mode === 'production'
                ? {collapseWhitespace: true, sortAttributes: true, sortClassNames: true} // sorting gives better
                                                                                         // gzipping results
                : false
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${ROOT}/**/*`, {nodir: true})
    }),
    new CleanWebpackPlugin()
  ].concat(
    argv.mode === 'production'
    ? [new HTMLInlineCSSWebpackPlugin()]
    : []
  ),
  output      : {
    filename: '[name].js',
    path    : path.resolve(__dirname, 'dist')
  }
})
