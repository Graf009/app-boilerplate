/**
 * Created by Oleg Orlov on 07.09.15.
 */

var path         = require('path');
var webpack      = require('webpack');
var TextPlugin   = require('extract-text-webpack-plugin');
var HtmlPlugin   = require('html-webpack-plugin');

// PostCSS
var use = require('postcss-use');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

module.exports = function(_path) {
  var rootAssetPath = path.join(_path, 'public');
  var pjson = require(_path + '/package.json');
  var appNameVersion  = pjson.name + ' v' + pjson.version;

  return {

    // output system
    output: {
      path: path.join(_path, 'public'),
      filename: path.join('assets', 'js', '[name].[hash].js'),
      chunkFilename: '[id].chunk.[chunkhash].js',
      publicPath: '/',
    },

    // resolves modules
    resolve: {
      extensions: ['', '.js'],
      modulesDirectories: ['node_modules'],
      alias: {
        _components: path.join(_path, 'src', 'components'),
        _containers: path.join(_path, 'src', 'containers'),
        _actions:    path.join(_path, 'src', 'actions'),
        _reducers:   path.join(_path, 'src', 'reducers'),
        _store:      path.join(_path, 'src', 'store'),
        _config:     path.join(_path, 'src', 'config'),
        _helpers:    path.join(_path, 'src', 'helpers'),
        _utils:      path.join(_path, 'src', 'utils'),
      },
    },

    // pluggin
    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        __CLIENT__:   true,
        __SERVER__: false,
        __APP_CONFIG__: JSON.stringify(process.env.APP_CONFIG || 'development'),
        __APP_VERSION__: JSON.stringify(appNameVersion),
      }),
      new webpack.optimize.CommonsChunkPlugin('vendors', 'assets/js/vendors.[hash].js'),
      new TextPlugin('assets/css/[name].[hash].css'),
      new HtmlPlugin({
        title: appNameVersion,
        chunks: ['application', 'vendors'],
        filename: 'index.html',
        template: path.join(_path, 'assets', 'index.html'),
        favicon: path.join(_path, 'assets', 'favicon-32x32.png'),
        minify: {
          removeComments: true,
          collapseWhitespace: true,
        },
      }),
    ],

    // postcss
    postcss: {
      defaults: [use({ modules: '*'}), autoprefixer({ browsers: ['last 2 version'] })],
      minify:   [use({ modules: '*'}), autoprefixer({ browsers: ['last 2 version'] }), cssnano()],
    },
  };
};
