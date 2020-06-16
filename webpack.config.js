const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './src/app.js'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      options: {
        presets: ['env'],
        plugins: ['transform-object-rest-spread'],
      },
      test: /\.js$/,
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
      ],
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader',
      ],
    }],
  },
  // devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
  },
};
