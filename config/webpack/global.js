/*
* @Author: Oleg Orlov
* @Date:   2015-09-07 15:50:19
*/

import path from'path';
import webpack from 'webpack';
import HtmlPlugin from 'html-webpack-plugin';

// PostCSS
import use from 'postcss-use';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default function(_path) {
  const pjson = require(_path + '/package.json');
  const appNameVersion = `${pjson.name} v${pjson.version}`;
  const dependencies = Object.keys(pjson.dependencies);

  return {
    entry: {
      vendors: [
        ...dependencies,
        '_mdlCSS',
        '_mdlJS',
      ],
    },

    // output system
    output: {
      path: path.join(_path, 'public'),
      filename: path.join('assets', 'js', '[name].[chunkhash:6].js'),
      chunkFilename: '[id].chunk.[chunkhash:6].js',
      publicPath: '/',
    },

    // resolves modules
    resolve: {
      extensions: ['', '.js'],
      modulesDirectories: ['node_modules'],
      alias: {
        _components: path.join(_path, 'src', 'components'),
        _containers: path.join(_path, 'src', 'containers'),
        _actions: path.join(_path, 'src', 'actions'),
        _reducers: path.join(_path, 'src', 'reducers'),
        _store: path.join(_path, 'src', 'store'),
        _config: path.join(_path, 'src', 'config'),
        _utils: path.join(_path, 'src', 'utils'),
        _routes: path.join(_path, 'src', 'routes'),
        _mdlCSS: 'material-design-lite/material.min.css',
        _mdlJS: 'material-design-lite/material.min.js',
      },
    },

    // pluggin
    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        __CLIENT__: true,
        __SERVER__: false,
        __APP_CONFIG__: JSON.stringify(process.env.APP_CONFIG || 'development'),
        __APP_VERSION__: JSON.stringify(appNameVersion),
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        filename: 'assets/js/vendors.[hash:6].js',
        minChunks: Infinity,
      }),
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
      minify: [use({ modules: '*'}), autoprefixer({ browsers: ['last 2 version'] }), cssnano()],
    },
  };
}
