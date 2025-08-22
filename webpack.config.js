
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'dist/js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  mode: 'production'
};