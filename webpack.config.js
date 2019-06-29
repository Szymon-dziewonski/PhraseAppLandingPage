const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');
const ROOT = path.resolve(__dirname, 'src');

module.exports = {
  context: ROOT,
  entry  : ['./application.scss', './application.js'],
  module : {
    rules: [
      {
        test: /\.scss$/,
        use : [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          //{loader: 'css-loader', options: {url: false}},
          'sass-loader'
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    })
  ],
  output : {
    filename: '[name].js',
    path    : path.resolve(__dirname, 'app', 'dist')
  }
};
