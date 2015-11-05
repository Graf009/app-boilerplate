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

  var FILE_LOADER_STRING = 'file?context=' + rootAssetPath + '&name=assets/static/[ext]/[name].[hash].[ext]';
  var IMG_OPT_STRING = 'image-webpack?bypassOnDebug&optimizationLevel=7';

  return {
    context: _path,
    debug: false,
    devtool: 'cheap-source-map',
    entry: {
      application: _path + '/src/index.js',
      vendors: dependencies,
    },
    module: {
      loaders: [
        { test: /\.js$/, loader: 'babel', include: rootSourcePath },
        { test: /\.css$/, loader: TextPlugin.extract('css?importLoaders=1!postcss?pack=minify') },
        { test: /\.(ttf|eot|woff|woff2|ico)$/i, loader: FILE_LOADER_STRING },
        { test: /\.(png|svg)$/i, loaders: [FILE_LOADER_STRING, IMG_OPT_STRING + '&interlaced=true'] },
        { test: /\.(gif)$/i, loaders: [FILE_LOADER_STRING, IMG_OPT_STRING + '&interlaced=false'] },
        { test: /\.(jpe?g)$/i, loaders: [FILE_LOADER_STRING, IMG_OPT_STRING + '&interlaced=false&progressive=true'] },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        // This has effect on the react lib size
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
        __DEVELOPMENT__: false,
        __DEVTOOLS__: false,
      }),

      // optimizations
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        comments: false,
        compress: {
          warnings: false,
          screw_ie8: true,
        },
      }),
    ],
  };
};
