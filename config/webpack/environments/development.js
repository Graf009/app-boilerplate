/*
* @Author: Oleg Orlov
* @Date:   2015-09-07 15:17:19
*/

var path         = require('path');
var webpack      = require('webpack');
var TextPlugin   = require('extract-text-webpack-plugin');

module.exports = function(_path) {
  var rootAssetPath = path.join(_path, 'public');
  var rootSourcePath = path.join(_path, 'src');
  var dependencies  = Object.keys(require(_path + '/package.json').dependencies);

  return {
    context: _path,
    debug: true,
    devtool: 'cheap-inline-source-map',
    entry: {
      application: [
        'webpack-hot-middleware/client',
        _path + '/src/index.js',
      ],
      vendors: dependencies,
    },
    module: {
      loaders: [
        { test: /\.js$/, loader: 'babel', include: rootSourcePath },
        { test: /\.css$/, loader: TextPlugin.extract('css?sourceMap&importLoaders=1!postcss') },
        { test: /\.(ttf|eot|woff|woff2|png|ico|jpg|jpeg|gif|svg)$/i, loaders: ['file?context=' + rootAssetPath + '&name=assets/static/[ext]/[name].[hash].[ext]'] },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEVELOPMENT__: true,
        __DEVTOOLS__: true,
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
  };
};
