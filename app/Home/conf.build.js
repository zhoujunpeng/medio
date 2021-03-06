const Path = require('path');
const Webpack = require('webpack');
const Merge = require('webpack-merge');
const ConfOfVue = require('./conf.build.vue');
const IsDev = process.env.NODE_ENV === 'development';

module.exports = Merge({
  entry: {
    index: Path.resolve(__dirname, './static/js/index.js')
  },
  output: {
    filename: `home/js/${IsDev?'[name]':'[name].[chunkhash:8]'}.js`,
    chunkFilename: `home/js/modules/${IsDev?'[name]' : '[name].[chunkhash:8]'}.js`,
    publicPath: '/static/'
  },
  profile: true,
  module: {
    rules: [{
      test: /\.scss$/,
      use: ['style-loader','css-loader','sass-loader']
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: `home/assets/img/${IsDev?'[name]':'[name].[hash:8]'}.[ext]`
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: `home/assets/fonts/${IsDev?'[name]':'[name].[hash:8]'}.[ext]`
      }
    }]
  },
  resolve: {
    alias: {
      '@home': Path.resolve(__dirname,'./static'),
      '@style': Path.resolve(__dirname,'../../components/styles'),
      '@components': Path.resolve(__dirname,'../../components/vue')
    }
  }
},ConfOfVue());