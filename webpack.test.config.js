const path = require('path')
const Webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: "./test/test",
  output: {
    path: path.resolve(__dirname, '../dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            hotReload: true
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    // new Webpack.DefinePlugin({
    //   'BUILD.date':  JSON.stringify(new Date().toLocaleString()),
    // }),
    new HTMLWebpackPlugin({
      template: './index.html',
      filename: './index.html'
    }),
    new VueLoaderPlugin(),
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*','.js', '.vue', '.json']
  },
  devServer: {
    host: '0.0.0.0', // can be overwritten by process.env.HOST // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
  },
}