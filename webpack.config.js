const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
        include: [path.resolve(__dirname, 'src')],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('node-sass'),
            },
          },
        ],
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [new webpack.ProgressPlugin(), new HtmlWebpackPlugin({ template: './src/index.html' })],
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.scss', '.css', '.svg', '.png', '.jpg'],
  },
};
