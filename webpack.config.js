module.exports = {
  entry: {
    index: './client/index.js',
    login: './client/login.js',
  },
  output: {
    path: __dirname,
    publicPath: '/',
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
  },
};
