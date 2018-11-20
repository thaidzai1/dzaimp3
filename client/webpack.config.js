const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true, //fix router reload error
    inline: true,
    contentBase: './public',
    port: 3000,
    //config proxy for deve env
    proxy: {
      "/auth/*": {
        target: "http://localhost:5000", secure: false
      },
      "/api/*": {
        target: "http://localhost:5000", secure: false
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['css-loader', 'style-loader']
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader'
          },{
            loader: 'css-loader'
          },{
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ]
}
